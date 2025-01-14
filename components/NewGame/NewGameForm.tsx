import React, { Dispatch, SetStateAction } from "react";
import firebase from "@/firebase/clientApp";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const db = getFirestore(firebase);

interface NewGameFormProps {
  team1: string;
  setTeam1: Dispatch<SetStateAction<string>>;
  team2: string;
  setTeam2: Dispatch<SetStateAction<string>>;
  setTeam1Players: Dispatch<SetStateAction<string[]>>;
  setTeam2Players: Dispatch<SetStateAction<string[]>>;
  setIsTeamsSelected: Dispatch<SetStateAction<boolean>>;
  setIsTeam1Selection: Dispatch<SetStateAction<boolean>>;
}
const NewGameForm = ({
  team1,
  team2,
  setTeam1,
  setTeam2,
  setTeam1Players,
  setTeam2Players,
  setIsTeamsSelected,
  setIsTeam1Selection,
}: NewGameFormProps) => {
  const getPlayers = async (team: string) => {
    const q = query(
      collection(db, "basketballplayers"),
      where("team", "==", team),
    );
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const players = snapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      const result = players.map((person) => person.firstname);

      return result;
    } else return [];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!team1 || !team2) {
      alert("Teams cannot be empty");
      return;
    }
    if (team1 === team2) {
      alert("Teams cannot be the same");
      return;
    }
    try {
      const playersTeam1 = await getPlayers(team1);
      const playersTeam2 = await getPlayers(team2);

      setTeam1Players(playersTeam1);
      setTeam2Players(playersTeam2);
    } catch (error) {
      console.log(error);
    }
    setIsTeamsSelected(true);
    setIsTeam1Selection(true);
  };

  return (
    <div className="flex h-1/2 w-[90%] flex-col items-center rounded-[20px] bg-[#0F0050]">
      <form
        onSubmit={handleSubmit}
        className="flex h-full w-full flex-col items-center justify-evenly"
      >
        <select
          value={team1}
          onChange={(e) => setTeam1(e.target.value)}
          className="w-3/4"
        >
          <option value="">Select Team 1</option>
          <option value="Bluejays">Bluejays</option>
          <option value="Cirok">Cirok</option>
          <option value="Madiba">Madiba</option>
          <option value="TSG">TSG</option>
        </select>
        <p className="font-bold text-white">VS</p>
        <select
          value={team2}
          onChange={(e) => setTeam2(e.target.value)}
          className="w-3/4"
        >
          <option value="">Select Team 2</option>
          <option value="Bluejays">Bluejays</option>
          <option value="Cirok">Cirok</option>
          <option value="Madiba">Madiba</option>
          <option value="TSG">TSG</option>
        </select>
        <button
          type="submit"
          className="w-1/4 rounded-[5px] bg-[#FFC521] text-white"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewGameForm;
