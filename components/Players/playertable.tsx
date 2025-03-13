"use client";
import React, { useEffect, useState } from "react";
import firebase from "@/firebase/clientApp";
import { getDocs, getFirestore } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { Roboto_Condensed } from "next/font/google";
import { useRouter } from "next/navigation";

const db = getFirestore(firebase);

const roboto = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["400", "700"],
});

type PlayerType = {
  firstname: string;
  lastname: string;
  position: string;
  number: string;
  department: string;
  level: number;
  team: string;
  username: string;
};

const PlayerTable = () => {
  const [playerName, setPlayerName] = useState("");
  const [team, setTeam] = useState("");
  const [level, setLevel] = useState("");
  const [department, setDepartment] = useState("");
  const [players, setPlayers] = useState<PlayerType[]>([]);

  const router = useRouter();

  useEffect(() => {
    getTable();
  }, []);

  const getTable = async () => {
    try {
      const dbRef = collection(db, "basketballplayers");
      const data = await getDocs(dbRef);
      const playersArray = data.docs.map((doc) => doc.data() as PlayerType);
      setPlayers(playersArray);
      console.log(playersArray);
    } catch (error) {
      console.error("Error fetching players:", error);
    }
  };

  return (
    <div className="flex h-[90%] w-screen flex-col overflow-hidden px-[10%] pt-[10%]">
      {/* Filter */}
      <div
        className={`flex h-[20%] ${roboto.className} w-auto flex-col justify-between font-bold`}
      >
        <input
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          className="h-[20%] w-full rounded border border-black bg-[#D9D9D9]"
          placeholder="Search Player"
        />
        <div className="h-[20%] w-full">
          <select
            value={team}
            onChange={(e) => setTeam(e.target.value)}
            className="h-full w-full rounded border border-black bg-[#D9D9D9]"
          >
            <option value="">Select Team</option>
            <option value={"Madiba"}>Madiba</option>
            <option value={"Bluejays"}>Bluejays</option>
            <option value={"Cirok"}> Cirok</option>
            <option value={"TSG"}> TSG</option>
          </select>
        </div>
        <div className="h-[20%] w-full">
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="h-full w-full rounded border border-black bg-[#D9D9D9]"
          >
            <option value="">Select Level</option>
            <option value={"100"}>100</option>
            <option value={"200"}>200</option>
            <option value={"300"}> 300</option>
            <option value={"400"}> 400</option>
            <option value={"500"}> 500</option>
          </select>
        </div>
        <div className="h-[20%] w-full">
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="h-full w-full rounded border border-black bg-[#D9D9D9]"
          >
            <option value="">Select Dept</option>
            <option value={"Comp Sci."}>Comp Sci.</option>
            <option value={"MEE"}>MEE</option>
            <option value={"EE"}> EE</option>
            <option value={"Software Eng."}> Software Eng.</option>
            <option value={"Finance"}> Finance</option>
            <option value={"Biz Ad"}> Biz Ad</option>
            <option value={"Econs"}> Econs</option>
            <option value={"ISMS"}> ISMS</option>
            <option value={"Mass Comm."}> Mass Comm.</option>
            <option value={"Mechatronics"}> Mechatronics</option>
            <option value={"Accounting"}> Mechatronics</option>
          </select>
        </div>
      </div>
      <div className="mt-[10%] h-[60%] w-auto">
        <div className="h-full w-full overflow-auto bg-white">
          <table className="playerTable w-full border-collapse bg-white">
            <thead className="sticky top-0 bg-[#FFC521]">
              <tr
                className={` ${roboto.className} h-[30px] text-[12px] text-[#343232]`}
              >
                <th className="w-[35%] pl-2 text-left">Player</th>
                <th className="w-[20%]">Team</th>
                <th className="w-[10%]">Level</th>
                <th className="w-[20%]">Department</th>
              </tr>
            </thead>
            <tbody className="">
              {players.map((player) => (
                <tr key={player.username} className="h-[50px]">
                  <td className="w-[35%]">
                    <p
                      className="text-[#0268d6]"
                      onClick={() => router.push(`/players/${player.username}`)}
                    >
                      {player.firstname} {player.lastname}
                    </p>
                  </td>
                  <td className="w-[20%]">
                    <p>{player.team}</p>
                  </td>
                  <td className="w-[10%]">
                    <p>{player.level}</p>
                  </td>
                  <td className="w-[20%]">
                    <p>{player.department}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PlayerTable;
