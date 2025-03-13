"use client";
import React, { useEffect, useState } from "react";
import firebase from "@/firebase/clientApp";
import { collection, getDocs, getFirestore } from "firebase/firestore";

interface TeamsType {
  id: string;
  wins: number;
  played: number;
  position: number;
}

const db = getFirestore(firebase);

const StandingsRows = () => {
  const [teams, setTeams] = useState<TeamsType[]>([]);

  const getTeams = async () => {
    try {
      const colRef = collection(db, "teams");
      const result = await getDocs(colRef);
      const sortedTeams = result.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }) as TeamsType)
        .sort((a, b) => a.position - b.position); // ✅ Sort by position

      setTeams(sortedTeams);
      console.log(sortedTeams);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  useEffect(() => {
    getTeams();
  }, []);

  return (
    <tbody>
      {teams.map((team) => (
        <tr key={team.id} className="text-center">
          <td>{team.position}</td>
          <td>{team.id}</td>
          <td>{team.played}</td>
          <td>{team.wins}</td>
          <td>{team.played - team.wins}</td>
          <td>
            {team.played ? ((team.wins * 100) / team.played).toFixed(2) : "0"}%
          </td>
          <td>{team.wins * 3}</td>
        </tr>
      ))}
    </tbody>
  );
};

export default StandingsRows;
