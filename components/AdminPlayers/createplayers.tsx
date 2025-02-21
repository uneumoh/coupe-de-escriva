import firebase from "@/firebase/clientApp";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import React, { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import closeButton from "@/public/images/close-button.svg";

const db = getFirestore(firebase);
const colRef = collection(db, "basketballplayers");

interface Props {
  setCreatePlayerModal: Dispatch<SetStateAction<boolean>>;
  getTable: () => void;
}

const CreatePlayers = ({ setCreatePlayerModal, getTable }: Props) => {
  const [playerInfo, setPlayerInfo] = useState({
    firstname: "",
    lastname: "",
    team: "",
    level: "",
    department: "",
    number: "",
    position: "",
    jersey: "",
    username: "",
    totalStats: {
      points: 0,
      assists: 0,
      rebounds: 0,
      steals: 0,
      blocks: 0,
    },
    draftpick: "",
  });

  const handleChangeInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setPlayerInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addPlayer = async () => {
    console.log(playerInfo);

    try {
      await addDoc(colRef, playerInfo);
      alert("Player Registered Successfully");
      getTable();
      setCreatePlayerModal(false);
    } catch (error) {
      alert("Player Registration Unsuccessful");
      console.log(error);
    }
  };

  return (
    <>
      <div className="overlay" />
      <div className="modal flex w-full flex-col items-center rounded-[10px]">
        <div className="flex w-full flex-row justify-end">
          <Image
            src={closeButton}
            width={20}
            height={20}
            alt="close button"
            className="cursor-pointer"
            onClick={() => setCreatePlayerModal(false)}
          />
        </div>
        <div className="flex h-[85%] w-full flex-col justify-evenly">
          {/* First Name */}
          <div className="flex flex-row items-center justify-between px-[2%]">
            <label>First Name:</label>
            <input
              name="firstname"
              value={playerInfo.firstname}
              onChange={handleChangeInput}
              className="rounded border border-black"
            />
          </div>

          {/* Last Name */}
          <div className="flex flex-row items-center justify-between px-[2%]">
            <label>Last Name:</label>
            <input
              name="lastname"
              value={playerInfo.lastname}
              onChange={handleChangeInput}
              className="rounded border border-black"
            />
          </div>

          {/* Number */}
          <div className="flex flex-row items-center justify-between px-[2%]">
            <label>Number:</label>
            <input
              name="number"
              type="text"
              value={playerInfo.number}
              onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                // Remove non-numeric characters
                let val = e.target.value.replace(/[^0-9]/g, "");

                // Prevent numbers from starting with 0 unless it's "00"
                if (val.length > 1 && val.startsWith("0") && val !== "00") {
                  val = val.slice(1);
                }

                // Limit input to 2 characters
                e.target.value = val.slice(0, 2);
              }}
              onChange={handleChangeInput}
              className="rounded border border-black"
            />
          </div>

          {/* Position */}
          <div className="flex flex-row items-center justify-between px-[2%]">
            <label>Position:</label>
            <select
              name="position"
              value={playerInfo.position}
              onChange={handleChangeInput}
              className="rounded border border-black"
            >
              <option value="">Select Position</option>
              <option value="PG">PG</option>
              <option value="SG">SG</option>
              <option value="SF">SF</option>
              <option value="PF">PF</option>
              <option value="C">C</option>
            </select>
          </div>

          {/* Level */}
          <div className="flex flex-row items-center justify-between px-[2%]">
            <label>Level:</label>
            <select
              name="level"
              value={playerInfo.level}
              onChange={handleChangeInput}
              className="rounded border border-black"
            >
              <option value="">Select Level</option>
              <option value="100">100</option>
              <option value="200">200</option>
              <option value="300">300</option>
              <option value="400">400</option>
              <option value="500">500</option>
            </select>
          </div>

          {/* Department */}
          <div className="flex flex-row items-center justify-between px-[2%]">
            <label>Department:</label>
            <select
              name="department"
              value={playerInfo.department}
              onChange={handleChangeInput}
              className="rounded border border-black"
            >
              <option value="">Select Department</option>
              <option value="Comp Sci.">Comp Sci.</option>
              <option value="MEE">MEE</option>
              <option value="EE">EE</option>
              <option value="Software Eng.">Software Eng.</option>
              <option value="Finance">Finance</option>
              <option value="Biz Ad">Biz Ad</option>
              <option value="Econs">Econs</option>
              <option value="ISMS">ISMS</option>
              <option value="Mass Comm.">Mass Comm.</option>
              <option value="Mechatronics">Mechatronics</option>
              <option value="Accounting">Accounting</option>
            </select>
          </div>

          {/* Team */}
          <div className="flex flex-row items-center justify-between px-[2%]">
            <label>Team:</label>
            <select
              name="team"
              value={playerInfo.team}
              onChange={handleChangeInput}
              className="rounded border border-black"
            >
              <option value="">Select Team</option>
              <option value="Bluejays">Bluejays</option>
              <option value="Cirok">Cirok</option>
              <option value="Madiba">Madiba</option>
              <option value="TSG">TSG</option>
            </select>
          </div>

          {/* Username */}
          <div className="flex flex-row items-center justify-between px-[2%]">
            <label>Username:</label>
            <input
              name="username"
              value={playerInfo.username}
              onChange={handleChangeInput}
              className="rounded border border-black"
            />
          </div>

          {/* Jersey */}
          <div className="flex flex-row items-center justify-between px-[2%]">
            <label>Jersey:</label>
            <input
              name="jersey"
              value={playerInfo.jersey}
              onChange={handleChangeInput}
              className="rounded border border-black"
              maxLength={11}
            />
          </div>
          {/* Draft Pick */}
          <div className="flex flex-row items-center justify-between px-[2%]">
            <label>Draft Pick:</label>
            <input
              name="draftpick"
              value={playerInfo.draftpick}
              onChange={handleChangeInput}
              onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                e.target.value = e.target.value
                  .replace(/[^0-9]/g, "")
                  .slice(0, 3);
              }}
              className="rounded border border-black"
              type="text"
              maxLength={3}
            />
          </div>
        </div>
        <div className="flex h-[10%] w-full flex-row items-center justify-center">
          <button
            onClick={addPlayer}
            className="w-1/2 rounded border border-black bg-[#0F0050] text-white"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default CreatePlayers;
