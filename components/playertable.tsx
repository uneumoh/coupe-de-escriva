"use client";
import React, { useEffect, useState } from "react";
import firebase from "@/firebase/clientApp";
import { getDatabase, ref, set, get, child, onValue } from "firebase/database";

const db = getDatabase(firebase);

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

  useEffect(() => {
    getTable();
  }, []);

  const getTable = () => {
    const dbRef = ref(db, "basketballplayers/");
    onValue(dbRef, async (snapshot) => {
      const data = await snapshot.val();
      const playersArray: PlayerType[] = data ? Object.values(data) : [];
      setPlayers(playersArray);
      console.log(playersArray);
    });
  };

  return (
    <div className="flex flex-1 flex-col px-[9vh] pt-[9vh]">
      <div className="flex h-[5vh] w-full flex-row bg-white">
        <input
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          className="h-[5vh] w-[27vw] rounded border border-black bg-[#D9D9D9]"
        />
        <div>
          <select
            value={team}
            onChange={(e) => setTeam(e.target.value)}
            className="ml-[5vw] h-full w-[12vw] rounded border border-black bg-[#D9D9D9]"
          >
            <option value="">Select Team</option>
            <option value={"Madiba"}>Madiba</option>
            <option value={"Bluejays"}>Bluejays</option>
            <option value={"Cirok"}> Cirok</option>
            <option value={"TSG"}> TSG</option>
          </select>

          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="ml-[5vw] h-full w-[12vw] rounded border border-black bg-[#D9D9D9]"
          >
            <option value="">Select Level</option>
            <option value={"100"}>100</option>
            <option value={"200"}>200</option>
            <option value={"300"}> 300</option>
            <option value={"400"}> 400</option>
          </select>

          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="ml-[5vw] h-full w-[12vw] rounded border border-black bg-[#D9D9D9]"
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
      <div className="mt-[5vh] h-[60vh] w-full overflow-scroll bg-[#0F0050]">
        <table className="w-full border-collapse border border-black">
          <tbody className="border-collapse border-black bg-white">
            {players.map((player) => (
              <tr key={player.username} className="border border-black">
                <td>
                  <p>Picture goes here</p>
                </td>
                <td className="border border-black">
                  <p>
                    {player.firstname} {player.lastname}
                  </p>
                </td>
                <td className="border border-black">
                  <p>{player.team}</p>
                </td>
                <td className="border border-black">
                  <p>{player.level}</p>
                </td>
                <td className="border border-black">
                  <p>{player.department}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlayerTable;
