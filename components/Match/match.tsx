"use client";
import Header from "@/components/header";
import React, { useEffect, useState } from "react";
import PlayerIcon from "@/components/Match/PlayerIcon";
import ControlBar from "./ControlBar";
import EventTable from "./EventTable";
import Container from "../Container";
import firebase from "@/firebase/clientApp";
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import MatchOverlay from "./MatchOverlay";

const db = getFirestore(firebase);

interface Player {
  firstname: string;
  lastname: string;
  number: string;
  position: string;
  level: string;
  department: string;
  team: string;
  username: string;
  jersey: string;
}

interface GameSettingsType {
  gametype: string;
  foullimit: string;
  timeoutsfirsthalf: string;
  timeoutssecondhalf: string;
}

interface Props {
  team1: string;
  team2: string;
  onFieldTeam1: Player[];
  onFieldTeam2: Player[];
  team1Players: Player[];
  team2Players: Player[];
  gameSettings: GameSettingsType;
}

interface MatchEvents {
  Actor: string;
  Event: string;
}

interface PlayerStatsType {
  username: string;
  points: number;
  assists: number;
  rebounds: number;
  steals: number;
  blocks: number;
  fouls: number;
}

const Match = ({
  team1,
  team2,
  onFieldTeam1,
  onFieldTeam2,
  team1Players,
  team2Players,
  gameSettings,
}: Props) => {
  const [playerStats, setPlayerStats] = useState<PlayerStatsType[]>([]);
  const [matchScores, setMatchScores] = useState({
    team1Score: 0,
    team2Score: 0,
  });
  const [selectedPlayerStats, setSelectedPlayerStats] =
    useState<PlayerStatsType | null>(null);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [playerSelected, setPlayerSelected] = useState(false);

  const initializeStats = async (players: Player[]) => {
    const docId = `${team1}-${team2}-${gameSettings.gametype}`;
    const statsPromises = players.map(async (player) => {
      const statsRef = doc(db, "games", docId, "stats", player.username);
      const defaultStats = {
        points: 0,
        assists: 0,
        rebounds: 0,
        steals: 0,
        blocks: 0,
        fouls: 0,
      };
      try {
        await setDoc(statsRef, defaultStats, { merge: true });
      } catch (error) {
        console.error(
          `Error initializing stats for ${player.username}:`,
          error,
        );
      }
    });
    await Promise.all(statsPromises);
  };

  const updateStats = async (
    player: Player,
    stat: keyof PlayerStatsType,
    number?: number,
  ) => {
    const docId = `${team1}-${team2}-${gameSettings.gametype}`;
    const statsRef = doc(db, "games", docId, "stats", player.username);
    const stats = playerStats.find((stat) => stat.username === player.username);

    if (stats) {
      try {
        await setDoc(
          statsRef,
          {
            [stat]: (stats[stat] as number) + (number ?? 1),
          },
          { merge: true },
        );
      } catch (error) {
        console.error(`Error updating ${stat} for ${player.username}:`, error);
      }
    }
  };

  const currentDate = () => {
    const date = new Date();
    return date.toISOString().split("T")[0];
  };

  const createGameDocument = async () => {
    const docId = `${team1}-${team2}-${gameSettings.gametype}`;
    const gameRef = doc(db, "games", docId);
    try {
      const gameSnap = await getDoc(gameRef);
      if (!gameSnap.exists()) {
        await setDoc(gameRef, {
          Team1: team1,
          Team2: team2,
          events: {},
          team1Score: 0,
          team2Score: 0,
          Date: currentDate(),
        });
        await initializeStats([...team1Players, ...team2Players]);
        console.log("Game document created successfully");
      }
    } catch (error) {
      console.error("Error creating game document:", error);
    }
  };

  const subscribeToStats = () => {
    const docId = `${team1}-${team2}-${gameSettings.gametype}`;
    const statsCollectionRef = collection(db, "games", docId, "stats");
    return onSnapshot(statsCollectionRef, (snapshot) => {
      const updatedStats = snapshot.docs.map((doc) => ({
        username: doc.id,
        ...doc.data(),
      })) as PlayerStatsType[];
      setPlayerStats(updatedStats);
    });
  };

  const subscribeToScores = () => {
    const docId = `${team1}-${team2}-${gameSettings.gametype}`;
    const gameRef = doc(db, "games", docId);
    return onSnapshot(gameRef, (docSnap) => {
      const data = docSnap.data();
      if (data) {
        setMatchScores({
          team1Score: data.team1Score || 0,
          team2Score: data.team2Score || 0,
        });
      }
    });
  };

  useEffect(() => {
    createGameDocument();
    const unsubscribeStats = subscribeToStats();
    const unsubscribeScores = subscribeToScores();
    return () => {
      unsubscribeStats();
      unsubscribeScores();
    };
  }, []);

  const renderPlayerRows = (players: Player[]) => {
    return players.map((player) => {
      const stats = playerStats.find(
        (stat) => stat.username === player.username,
      );
      return (
        <tr
          key={player.username}
          onClick={() => {
            setPlayerSelected(true);
            setSelectedPlayer(player);
            setSelectedPlayerStats(stats || null);
          }}
        >
          <td>{`${player.firstname} ${player.lastname}`}</td>
          <td>{stats?.points || 0}</td>
          <td>{stats?.rebounds || 0}</td>
          <td>{stats?.assists || 0}</td>
          <td>{stats?.steals || 0}</td>
          <td>{stats?.blocks || 0}</td>
        </tr>
      );
    });
  };

  return (
    <Container style={{ backgroundColor: "#0F0051" }}>
      {playerSelected && (
        <MatchOverlay
          player={selectedPlayer}
          stats={selectedPlayerStats}
          setPlayerSelected={setPlayerSelected}
          setSelectedPlayer={setSelectedPlayer}
          setSelectedPlayerStats={setSelectedPlayerStats}
          updateStats={updateStats}
        />
      )}
      <div className="w-full">
        <table className="w-full text-white">
          <thead>
            <tr>
              <th className="w-[40%]">Name</th>
              <th className="w-[12%]">Pts</th>
              <th className="w-[12%]">Reb</th>
              <th className="w-[12%]">Ast</th>
              <th className="w-[12%]">Stl</th>
              <th className="w-[12%]">Blk</th>
            </tr>
          </thead>
          <tbody>{renderPlayerRows(team1Players)}</tbody>
        </table>
        <table className="mt-[10%] w-full text-white">
          <tbody>{renderPlayerRows(team2Players)}</tbody>
        </table>
      </div>
      <div className="w-full text-center text-white">
        <p>{`${team1} vs ${team2}`}</p>
        <p>{`Score: ${matchScores.team1Score} - ${matchScores.team2Score}`}</p>
      </div>
    </Container>
  );
};

export default Match;
