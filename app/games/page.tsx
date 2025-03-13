"use client";
import firebase from "@/firebase/clientApp";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { GamesType } from "../types/games";

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
    <div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Game Name</th>
            </tr>
          </thead>
          <tbody>
            {games?.map((game) => {
              return (
                <tr key={game.id}>
                  <td>{game.id}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Games;
