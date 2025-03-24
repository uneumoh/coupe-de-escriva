"use client";
import firebase from "@/firebase/clientApp";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { GamesType } from "../types/games";
import Header from "@/components/Headers/header";
import BottomNavBar from "@/components/Navigation/BottomNavBar";

const db = getFirestore(firebase);
const Games = () => {
  const [games, setGames] = useState<GamesType[]>();

  const getGames = async () => {
    try {
      const colRef = collection(db, "games");
      const result = await getDocs(colRef);
      const fetchedGames = result.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() }) as GamesType,
      );
      setGames(fetchedGames);
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };
  useEffect(() => {
    getGames();
  }, []);
  return (
    <div className="flex h-screen w-screen flex-col">
      <Header />
      <div className="flex h-[80%] w-full flex-col">
        <table className="table text-center">
          <thead>
            <tr className="bg-[#FFC521]">
              <th>Team 1</th>
              <th>Team 2</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {games?.map((game) => {
              return (
                <tr key={game.id}>
                  <td>{game.Team1}</td>
                  <td>{game.Team2}</td>
                  <td>
                    {game.team1Score} - {game.team2Score}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <BottomNavBar />
    </div>
  );
};

export default Games;
