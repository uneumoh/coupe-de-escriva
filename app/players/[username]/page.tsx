"use client";
import type { Player } from "@/app/types/match";
import firebase from "@/firebase/clientApp";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import YellowHeader from "@/components/Headers/yellowHeader";

const db = getFirestore(firebase);

const PlayerModal = () => {
  const params = useParams();
  const router = useRouter();
  const username = params?.username as string;
  const [activePlayer, setActivePlayer] = useState<Player | null>(null);

  const [playerAverges, setPlayerAverages] = useState({
    points: 0,
    assists: 0,
    rebounds: 0,
    steals: 0,
    blocks: 0,
  });

  useEffect(() => {
    const getPlayer = async () => {
      const playerRef = doc(db, "basketballplayers", username);
      const data = await getDoc(playerRef).then((doc) => doc.data());
      setActivePlayer(data as Player);
    };
    getPlayer();
    getPlayerStatAverages(username);
  }, [username]);

  const getPlayerStatAverages = async (username: string) => {
    const gamesRef = collection(db, "games"); // Collection of games
    const gamesSnapshot = await getDocs(gamesRef);

    let totalGames = 0;
    let totalStats = {
      points: 0,
      assists: 0,
      rebounds: 0,
      steals: 0,
      blocks: 0,
    };

    for (const gameDoc of gamesSnapshot.docs) {
      const statsRef = collection(db, `games/${gameDoc.id}/stats`); // Stats for this game
      const statsSnapshot = await getDocs(statsRef);

      const playerStatsDoc = statsSnapshot.docs.find(
        (doc) => doc.id === username,
      );

      if (playerStatsDoc) {
        console.log(playerStatsDoc.data());
        const playerStats = playerStatsDoc.data();
        totalGames += 1;
        totalStats.points += playerStats.points || 0;
        totalStats.assists += playerStats.assists || 0;
        totalStats.rebounds += playerStats.rebounds || 0;
        totalStats.steals += playerStats.steals || 0;
        totalStats.blocks += playerStats.blocks || 0;
      }
    }

    if (totalGames === 0) return null; // No games found

    setPlayerAverages({
      points: parseFloat((totalStats.points / totalGames).toFixed(1)),
      assists: parseFloat((totalStats.assists / totalGames).toFixed(1)),
      rebounds: parseFloat((totalStats.rebounds / totalGames).toFixed(1)),
      steals: parseFloat((totalStats.steals / totalGames).toFixed(1)),
      blocks: parseFloat((totalStats.blocks / totalGames).toFixed(1)),
    });
  };

  return (
    <div className="flex h-screen w-screen flex-col">
      <YellowHeader />
      <div className="flex h-[90%] flex-col bg-[#0F0051] pt-[10%] text-white">
        <div className="flex h-[5%] w-full flex-row">
          <button
            className="bg-red-700"
            onClick={() => router.push("/players")}
          >
            Back
          </button>
        </div>
        <div className="flex h-1/4 w-full flex-row">
          <div className="flex w-1/2 flex-col px-[10%]">
            <img
              src={`/Logos/${activePlayer?.team}.png`}
              alt="Team Logo"
              onError={(e) => (e.currentTarget.src = "/Logos/coupe.png")}
              className="w-[35%]"
            />
          </div>
          <div className="flex w-1/2 flex-col">
            <p className="font-bold">
              {activePlayer?.team} | #{activePlayer?.number} |{" "}
              {activePlayer?.position}
            </p>
            <p className="font-extrabold">
              {activePlayer?.firstname}
              <span className="block">{activePlayer?.lastname}</span>
            </p>
          </div>
        </div>
        {/* Stat Row  */}
        <div className="flex h-[10%] flex-row items-center justify-around border-t font-bold">
          <div className="flex flex-col items-center">
            <p>PTS</p>
            <p>{playerAverges.points}</p>
          </div>
          <div className="flex flex-col items-center">
            <p>AST</p>
            <p>{playerAverges.assists}</p>
          </div>
          <div className="flex flex-col items-center">
            <p>REB</p>
            <p>{playerAverges.rebounds}</p>
          </div>
          <div className="flex flex-col items-center">
            <p>STL</p>
            <p>{playerAverges.steals}</p>
          </div>
          <div className="flex flex-col items-center">
            <p>BLK</p>
            <p>{playerAverges.blocks}</p>
          </div>
        </div>
        <div className="flex h-[10%] flex-row items-center justify-around border-y font-bold">
          <div className="flex flex-col items-center">
            <p>Draft</p>
            <p>{activePlayer?.draftpick}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerModal;
