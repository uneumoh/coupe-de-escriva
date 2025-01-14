"use client";
import React, { useEffect, useState } from "react";
import firebase from "@/firebase/clientApp";
import { getDatabase } from "firebase/database";
import { collection, doc, getDocs, getFirestore } from "firebase/firestore";

interface TeamsType {
  id: string;
  wins: string;
  played: string;
  position: string;
}

const db = getFirestore(firebase);

const StandingsRows = () => {
  const [teams, setTeams] = useState<TeamsType[]>([]);

  const getTeams = async () => {
    try {
      const colRef = collection(db, "teams");
      const result = await getDocs(colRef);
      setTeams(
        result.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as TeamsType),
      );
      console.log(teams);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  useEffect(() => {
    getTeams();
  }, []);

  useEffect(() => {
    console.log(teams);
  }, [teams]);

  return (
    <tbody>
      {teams.map((team) => {
        <tr key={team.id}>
          <td>{team.position}</td>
          <td>{team.id}</td>
          <td>{team.played}</td>
          <td>{team.wins}</td>
          <td>{+team.played - +team.wins}</td>
          <td>{(+team.wins * 100) / +team.played}</td>
        </tr>;
      })}
    </tbody>
  );
};

export default StandingsRows;
