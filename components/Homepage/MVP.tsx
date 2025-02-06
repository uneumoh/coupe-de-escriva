"use client";
import React, { useEffect, useState } from "react";
import StatBlock from "./StatBlock";
import HomeScreenPlayerNumber from "./homescreenplayernumber";
import {
  collection,
  getFirestore,
  orderBy,
  query,
  limit,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import firebase from "@/firebase/clientApp";

const db = getFirestore(firebase);

interface topPlayer {
  id: string;
  points: number;
  assists: number;
  rebounds: number;
  steals: number;
  blocks: number;
  performanceScore: number;
}

const MVP = () => {
  const [playerInfo, setPlayerInfo] = useState({
    firstname: "",
    lastname: "",
    team: "",
    position: "",
    level: "",
    department: "",
    number: "",
  });
  const [stats, setStats] = useState<topPlayer>({
    id: "",
    points: 0,
    rebounds: 0,
    assists: 0,
    steals: 0,
    blocks: 0,
    performanceScore: 0,
  });

  const getMVPInfo = async (id: string) => {
    try {
      const playersRef = doc(db, "basketballplayers", id);
      const player = (await getDoc(playersRef)).data();
      return player;
    } catch (error) {
      console.error("Error fetching player info:", error);
      return null;
    }
  };

  const getMVP = async () => {
    try {
      const gamesQuery = query(
        collection(db, "games"),
        orderBy("Date", "desc"),
        limit(1),
      );
      const gamesDocs = await getDocs(gamesQuery);

      if (gamesDocs.docs.length > 0) {
        const lastGame = gamesDocs.docs[0];
        const gameId = lastGame.id;

        const statsQuery = query(collection(db, `games/${gameId}/stats`));
        const statsDocs = await getDocs(statsQuery);

        let topPlayer: topPlayer = {
          id: "",
          points: 0,
          rebounds: 0,
          assists: 0,
          steals: 0,
          blocks: 0,
          performanceScore: 0,
        };
        let maxScore = -1;

        statsDocs.forEach((doc) => {
          const data = doc.data(); // Explicitly cast the type

          const performanceScore =
            (data.points || 0) * 5 +
            (data.assists || 0) * 3 +
            (data.rebounds || 0) * 2 +
            (data.steals || 0) * 4 +
            (data.blocks || 0) * 4;

          if (performanceScore > maxScore) {
            maxScore = performanceScore;
            topPlayer = {
              id: doc.id,
              points: data.points || 0,
              assists: data.assists || 0,
              rebounds: data.rebounds || 0,
              steals: data.steals || 0,
              blocks: data.blocks || 0,
              performanceScore,
            };
          }
        });

        if (topPlayer) {
          console.log("MVP Player:", topPlayer);
          setStats(topPlayer);

          // Fetch player info
          console.log(stats);
          const playerData = await getMVPInfo(topPlayer.id);

          if (playerData) {
            setPlayerInfo({
              firstname: playerData.firstname || "Unknown",
              lastname: playerData.lastname || "Unknown",
              team: playerData.team || "N/A",
              position: playerData.position || "N/A",
              level: playerData.level || "N/A",
              department: playerData.department || "N/A",
              number: playerData.number || "00",
            });
          }
        } else {
          console.log("No stats available for the last game.");
        }
      } else {
        console.log("No games found.");
      }
    } catch (error) {
      console.error("Error fetching games or stats:", error);
    }
  };

  useEffect(() => {
    getMVP();
  }, []);

  return (
    <div className="mt-[10%] h-[60%] rounded-[5px] bg-[#0F0050]">
      <div className="h-[25px] rounded-t-[5px] bg-[#FFC521]">
        <h1 className="font-bold text-black">MVP</h1>
      </div>
      <div className="h-[94%]">
        <div className="flex h-full w-full flex-row rounded-[5px]">
          <div className="flex h-1/2 w-1/4 flex-col justify-evenly">
            <StatBlock>{stats.points} pts</StatBlock>
            <StatBlock>{stats.assists} ast</StatBlock>
            <StatBlock>{stats.rebounds} reb</StatBlock>
            <StatBlock>{stats.steals} stl</StatBlock>
            <StatBlock>{stats.blocks} blk</StatBlock>
          </div>
          <div className="flex w-1/2 flex-col items-center justify-center">
            <p className="text-[36px] font-bold text-white">
              {playerInfo.firstname}
            </p>
          </div>
          <div className="flex w-1/4 flex-col items-center justify-between">
            <div className="flex h-[60%] w-full flex-col items-center">
              <div className="flex h-[38%] w-full rounded-full bg-white"></div>
              <p className="text-[36px] font-bold text-white">
                {playerInfo.level}
              </p>
              <p className="text-[24px] font-bold text-white">
                {playerInfo.department}
              </p>
            </div>
            <HomeScreenPlayerNumber playerNumber={playerInfo.number} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MVP;
