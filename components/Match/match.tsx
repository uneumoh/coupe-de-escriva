"use client";
import React, { useEffect, useState } from "react";
import Container from "../Container";
import firebase from "@/firebase/clientApp";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  increment,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import MatchOverlay from "./MatchOverlay";

import { Player, PlayerStatsType, MatchEvents, Props } from "@/app/types/match";
import EndQuarter from "./EndQuarter";

const db = getFirestore(firebase);

const Match = ({
  team1,
  team2,
  onFieldTeam1,
  onFieldTeam2,
  team1Players,
  team2Players,
  setOnfieldTeam1,
  setOnfieldTeam2,
  gameSettings,
}: Props) => {
  const [quarter, setQuarter] = useState(1);
  const [endQuarterModal, setEndQuarterModal] = useState(false);
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
    const totalStatRef = doc(db, "basketballplayers", player.username);
    const stats = playerStats.find((stat) => stat.username === player.username);

    if (stats) {
      try {
        //Add Game Stat
        await setDoc(
          statsRef,
          {
            [stat]: (stats[stat] as number) + (number ?? 1),
          },
          { merge: true },
        );
        //Add Total Stat
        await setDoc(
          totalStatRef,
          {
            [`totalStats.${stat}`]: (stats[stat] as number) + (number ?? 1),
          },
          { merge: true },
        );
        //Event Adders
        if (stat === "points") {
          updateMatchScore(player, number ?? 1);
          const event: MatchEvents = {
            Actor: player.username,
            Event: `${number}`,
            timestamp: serverTimestamp(),
          };
          addEvent(event);
        } else {
          const event: MatchEvents = {
            Actor: player.username,
            Event: `${stat}`,
            timestamp: serverTimestamp(),
          };
          addEvent(event);
        }
      } catch (error) {
        console.error(`Error updating ${stat} for ${player.username}:`, error);
      }
    }
  };

  const updateMatchScore = (player: Player, number: number) => {
    const docId = `${team1}-${team2}-${gameSettings.gametype}`;
    const gameRef = doc(db, "games", docId);

    try {
      if (player.team === team1) {
        // Player belongs to team1
        setDoc(
          gameRef,
          {
            team1Score: matchScores.team1Score + number,
          },
          { merge: true },
        );
        setMatchScores((prev) => ({
          ...prev,
          team1Score: prev.team1Score + number,
        }));
      } else if (player.team === team2) {
        // Player belongs to team2
        setDoc(
          gameRef,
          {
            team2Score: matchScores.team2Score + number,
          },
          { merge: true },
        );
        setMatchScores((prev) => ({
          ...prev,
          team2Score: prev.team2Score + number,
        }));
      }
    } catch (error) {
      console.error("Error updating match score:", error);
    }
  };

  const addEvent = async (event: MatchEvents) => {
    const docId = `${team1}-${team2}-${gameSettings.gametype}`;
    const gameRef = doc(db, "games", docId); // Document reference
    const eventsCollectionRef = collection(gameRef, "events"); // Subcollection reference

    try {
      // Add the event to the subcollection
      await setDoc(doc(eventsCollectionRef), {
        ...event,
      });
      console.log("Event added successfully");
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  const undoLastEvent = async () => {
    const docId = `${team1}-${team2}-${gameSettings.gametype}`;
    const gamesRef = doc(db, "games", docId);
    const eventsCollectionRef = collection(gamesRef, "events");

    try {
      // Query the most recent event (last event)
      const lastEventQuery = query(
        eventsCollectionRef,
        orderBy("timestamp", "desc"),
        limit(1),
      );

      const querySnapshot = await getDocs(lastEventQuery);

      if (querySnapshot.empty) {
        console.log("No events to undo.");
        return;
      }

      // Get the last event
      const lastEventDoc = querySnapshot.docs[0];
      const eventId = lastEventDoc.id;
      const lastEventData = lastEventDoc.data();

      if (!lastEventData) {
        console.error("Last event data is missing.");
        return;
      }

      const { Actor, Event } = lastEventData;

      // Reverse the effects of the event
      if (Event === "1" || Event === "2" || Event === "3") {
        await reversePointsEffect(Actor, parseInt(Event));
        await updateTotalStats(Actor, "points", -parseInt(Event));
      } else {
        await reverseOtherEffects(Actor, Event);
        await updateTotalStats(Actor, Event, -1);
      }

      // Remove the last event
      await deleteDoc(doc(eventsCollectionRef, eventId));
      console.log(`Last event with ID ${eventId} has been undone.`);
    } catch (error) {
      console.error("Error undoing last event:", error);
    }
  };

  const updateTotalStats = async (
    username: string,
    stat: keyof PlayerStatsType,
    amount: number,
  ) => {
    const totalStatRef = doc(db, "basketballplayers", username);

    try {
      await setDoc(
        totalStatRef,
        {
          [`totalStats.${stat}`]: increment(amount),
        },
        { merge: true },
      );
    } catch (error) {
      console.error(`Error updating total stats for ${username}:`, error);
    }
  };

  // Reverse points effect on player stats and match score
  const reversePointsEffect = async (actor: string, points: number) => {
    const docId = `${team1}-${team2}-${gameSettings.gametype}`;
    const gameRef = doc(db, "games", docId);
    const statsCollectionRef = collection(gameRef, "stats");
    const statsRef = doc(statsCollectionRef, actor);

    try {
      // Retrieve player stats
      const statsSnap = await getDoc(statsRef);
      const statsData = statsSnap.data();

      if (!statsData) {
        console.error(`Stats not found for player ${actor}`);
        return;
      }

      // Revert player points
      const player = [...team1Players, ...team2Players].find(
        (player) => player.username === actor,
      );
      const updatedPoints = statsData.points - points;
      await setDoc(statsRef, { points: updatedPoints }, { merge: true });
      if (player) {
        updateMatchScore(player, -points);
      }
    } catch (error) {
      console.error("Error reversing points effect:", error);
    }
  };

  // Reverse other effects (e.g., fouls, assists, etc.)
  const reverseOtherEffects = async (
    actor: string,
    eventType: keyof MatchEvents,
  ) => {
    const docId = `${team1}-${team2}-${gameSettings.gametype}`;
    const gamesRef = doc(db, "games", docId);
    const statsRef = doc(gamesRef, "stats", actor);

    try {
      // Retrieve player stats
      const statsSnap = await getDoc(statsRef);
      const statsData = statsSnap.data();
      console.log(`Stats type ${eventType} not found for player ${actor}`);

      if (!statsData || !(eventType in statsData)) {
        console.error(`Stat type ${eventType} not found for player ${actor}`);
        return;
      }

      // Revert the specific stat
      const updatedStat = statsData[eventType] - 1;
      await setDoc(statsRef, { [eventType]: updatedStat }, { merge: true });
    } catch (error) {
      console.error(
        `Error reversing ${eventType} effect for player ${actor}:`,
        error,
      );
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

  const endQuarter = () => {
    if (quarter === 4) {
      endGame();
      return;
    }
    setQuarter((prev) => prev + 1);
    setEndQuarterModal(false);
  };

  const endGame = () => {
    console.log();
  };

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
          <td className="w-[40%]">{`${player.firstname} ${player.lastname}`}</td>
          <td className="w-[12%] text-center">{stats?.points || 0}</td>
          <td className="w-[12%] text-center">{stats?.rebounds || 0}</td>
          <td className="w-[12%] text-center">{stats?.assists || 0}</td>
          <td className="w-[12%] text-center">{stats?.steals || 0}</td>
          <td className="w-[12%] text-center">{stats?.blocks || 0}</td>
        </tr>
      );
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

  return (
    <Container style={{ backgroundColor: "#0F0051" }}>
      {endQuarterModal && <EndQuarter endQuarter={endQuarter} />}
      {playerSelected && (
        <MatchOverlay
          player={selectedPlayer}
          stats={selectedPlayerStats}
          setPlayerSelected={setPlayerSelected}
          setSelectedPlayer={setSelectedPlayer}
          setSelectedPlayerStats={setSelectedPlayerStats}
          updateStats={updateStats}
          teamPlayers={
            selectedPlayer?.team === team1
              ? team1Players.filter((player) => !onFieldTeam1.includes(player))
              : team2Players.filter(
                  (player) => !onFieldTeam2.includes(player),
                ) || null
          }
          setTeamPlayers={
            selectedPlayer?.team === team1 ? setOnfieldTeam1 : setOnfieldTeam2
          }
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
          <tbody>{renderPlayerRows(onFieldTeam1)}</tbody>
        </table>
        <table className="mt-[10%] w-full text-white">
          <tbody>{renderPlayerRows(onFieldTeam2)}</tbody>
        </table>
      </div>
      <div className="mt-[10%] w-full text-center text-[18px] text-white">
        <p>{`${team1} vs ${team2}`}</p>
        <p>{`${matchScores.team1Score} - ${matchScores.team2Score}`}</p>
        <p>Q{quarter}</p>
      </div>
      <div className="mt-[10%] flex w-full justify-center">
        <div onClick={undoLastEvent} className="rounded-lg bg-red-500 p-2">
          <p className="">Undo</p>
        </div>
      </div>
      <div className="mt-[5%] h-[5%] w-full pl-[25%]">
        <button
          className="h-full w-1/2 bg-[#FFC521]"
          onClick={() => {
            setEndQuarterModal(true);
          }}
        >
          End Quarter
        </button>
      </div>
    </Container>
  );
};

export default Match;
