"use client";
import firebase from "@/firebase/clientApp";
import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
  limit,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";

const db = getFirestore(firebase);

const LiveGameBar = () => {
  const [loading, setLoading] = useState(true);

  const getLastGame = async () => {
    setLoading(true);
    try {
      const gamesQuery = query(
        collection(db, "games"),
        orderBy("Date", "desc"),
        limit(1),
      );
      const gamesDocs = await getDocs(gamesQuery);
      if (gamesDocs.docs.length > 0) {
        const lastGame = gamesDocs.docs[0];
        const data = lastGame.data();
        setTeam1(data.Team1);
        setTeam2(data.Team2);
        setTeam1Score(data.team1Score);
        setTeam2Score(data.team2Score);
      } else {
        console.warn("No games found.");
      }
    } catch (error) {
      console.error("Error fetching games:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getLastGame();
  }, []);

  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");
  const [team1Score, setTeam1Score] = useState("");
  const [team2Score, setTeam2Score] = useState("");
  return (
    <div className="h-[20%] w-auto rounded-[5px] bg-[#0F0050]">
      <div className="h-[25px] w-auto rounded-t-[5px] bg-[#FFC521] font-bold">
        Live Fixture
      </div>
      <div className="flex h-[80%] flex-row items-center justify-between p-[2%]">
        <div className="flex h-full w-full items-center justify-evenly rounded-[5px] bg-white">
          {loading ? (
            "Loading..."
          ) : (
            <>
              <div className="flex flex-col items-center">
                <p className="text-[14px] font-bold text-black">{team1}</p>
                <p className="text-[36px] font-bold text-black">{team1Score}</p>
              </div>
              <div>
                <p>vs</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-[14px] font-bold text-black">{team2}</p>
                <p className="text-[36px] font-bold text-black">{team2Score}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveGameBar;
