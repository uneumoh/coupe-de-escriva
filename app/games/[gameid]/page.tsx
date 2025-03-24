import { GamesType, StatsType } from "@/app/types/games";
import Header from "@/components/Headers/header";
import firebase from "@/firebase/clientApp";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import React from "react";

const db = getFirestore(firebase);

export default async function GamesID({
  params,
}: {
  params: { gameid: string };
}) {
  const docRef = doc(db, "games", params.gameid);
  const gameDoc = await getDoc(docRef);
  const game = gameDoc.exists() ? (gameDoc.data() as GamesType) : null;

  const statsRef = collection(db, "games", params.gameid, "stats");
  const statsSnapshot = await getDocs(statsRef);
  const stats = statsSnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      points: data.points || 0,
      assists: data.assists || 0,
      rebounds: data.rebounds || 0,
      steals: data.steals || 0,
      blocks: data.blocks || 0,
    };
  }) as StatsType[];

  if (!game) {
    return <h1>Game Not Found</h1>;
  }

  return (
    <div className="flex h-screen w-screen flex-col">
      <Header />
      <div className="w-full">
        <div className="flex w-full flex-row justify-center">
          <h1>
            {game.Team1} vs {game.Team2}
          </h1>
        </div>
        <div className="flex w-full flex-row justify-center">
          {game.team1Score} - {game.team2Score}
        </div>
      </div>
      <div>
        <p>box score</p>
        <table>
          <thead>
            <tr>
              <th>player</th>
              <th>points</th>
              <th>assists</th>
              <th>rebounds</th>
              <th>steals</th>
              <th>blocks</th>
            </tr>
          </thead>
          <tbody>
            {stats.map((stat) => {
              return (
                <tr key={stat.id}>
                  <td>{stat.id}</td>
                  <td>{stat.points}</td>
                  <td>{stat.assists}</td>
                  <td>{stat.rebounds}</td>
                  <td>{stat.steals}</td>
                  <td>{stat.blocks}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
