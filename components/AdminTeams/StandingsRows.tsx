"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import firebase from "@/firebase/clientApp";
import { collection, getDocs, getFirestore } from "firebase/firestore";

interface TeamsType {
  id: string;
  wins: number;
  played: number;
  position: string;
}

interface Props {
  setEditTeam: Dispatch<SetStateAction<string>>;
  setEditTeamModal: Dispatch<SetStateAction<boolean>>;
}

const db = getFirestore(firebase);

const StandingsRows = ({ setEditTeam, setEditTeamModal }: Props) => {
  const [teams, setTeams] = useState<TeamsType[]>([]);

  const getTeams = async () => {
    try {
      const colRef = collection(db, "teams");
      const result = await getDocs(colRef);
      const fetchedTeams = result.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() }) as TeamsType,
      );

      // Sort teams by position before setting state
      setTeams(fetchedTeams.sort((a, b) => +a.position - +b.position));
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
        <tr key={team.id}>
          <td className="text-center">{team.position}</td>
          <td>{team.id}</td>
          <td className="text-center">{team.played}</td>
          <td className="text-center">{team.wins}</td>
          <td className="text-center">{team.played - team.wins}</td>
          <td className="text-center">
            {team.played ? ((+team.wins * 100) / +team.played).toFixed(2) : "0"}
            %
          </td>
          <td className="text-center">{team.wins * 3}</td>
          <td className="text-center">Form</td>
          <td
            onClick={() => {
              setEditTeamModal(true);
              setEditTeam(team.id);
            }}
            className="cursor-pointer text-blue-500 underline"
          >
            Edit
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default StandingsRows;
