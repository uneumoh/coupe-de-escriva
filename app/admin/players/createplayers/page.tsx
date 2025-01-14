"use client";
import React, { useState, useEffect } from "react";
import firebase from "@/firebase/clientApp";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";

const createplayers = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [number, setNumber] = useState("");
  const [position, setPosition] = useState("PG");
  const [level, setLevel] = useState("100");
  const [department, setDepartment] = useState("Comp Sci.");
  const [team, setTeam] = useState("Bluejays");
  const [username, setUsername] = useState("");
  const [jersey, setJersey] = useState("");

  const validLevels = ["100", "200", "300", "400", "500"];
  const validTeams = ["Bluejays", "Cirok", "Madiba", "TSG"];

  const db = getFirestore(firebase);

  const colRef = collection(db, "basketballplayers");

  function validatePlayerData(data: any): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Check required fields and types
    if (
      !data.name ||
      typeof data.firstname !== "string" ||
      typeof data.lastname !== "string"
    ) {
      errors.push(
        "name.firstname and name.lastname are required and must be strings.",
      );
    }
    if (!data.position || typeof data.position !== "string") {
      errors.push("position is required and must be a string.");
    }
    if (!data.number || typeof data.number !== "string") {
      errors.push("number is required and must be a string.");
    }
    if (!data.department || typeof data.department !== "string") {
      errors.push("department is required and must be a string.");
    }
    if (!validLevels.includes(data.level)) {
      errors.push("level is required and must be a number.");
    }
    if (!validTeams.includes(data.team)) {
      errors.push("team is required and must be a string.");
    }
    if (!data.username || typeof data.username !== "string") {
      errors.push("username is required and must be a string.");
    }
    if (!data.jersey || typeof data.jersey !== "string") {
      errors.push("jersey name is required and must be a string.");
    }

    return { valid: errors.length === 0, errors };
  }

  const addPlayer = () => {
    const data = {
      firstname: firstname,
      lastname: lastname,
      number: number,
      position: position,
      level: level,
      department: department,
      team: team,
      username: username,
      jersey: jersey,
    };
    if (!validatePlayerData(data).valid) {
      alert(validatePlayerData(data).errors);
      return;
    }

    try {
      const docRef = doc(colRef, username);
      setDoc(docRef, data);

      alert("Player Regsitered Successfully");
    } catch (error) {
      alert("Player Registration Unsuccessful");
      console.log(error);
    }
  };

  return (
    <div className="flex flex-1 flex-col bg-white">
      <div className="flex w-full flex-col items-center">
        {/* First Name */}
        <div className="flex h-[10vh] w-[30vw] flex-row items-center justify-between px-[2vw] py-[2vh]">
          <label>First Name:</label>
          <input
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
            className="rounded border border-black"
          />
        </div>
        {/* Last Name */}
        <div className="flex h-[10vh] w-[30vw] flex-row items-center justify-between px-[2vw] py-[2vh]">
          <label>Last Name:</label>
          <input
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
            className="rounded border border-black"
          />
        </div>
        {/* Number */}
        <div className="flex h-[10vh] w-[30vw] flex-row items-center justify-between px-[2vw] py-[2vh]">
          <label>Number:</label>
          <input
            type="number"
            value={number}
            min={0}
            max={100}
            onChange={(e) => {
              let x = +e.target.value;
              if (x == 100) setNumber("00");
              else setNumber(e.target.value);
            }}
            className="rounded border border-black"
          ></input>
        </div>
        {/* Position */}
        <div className="flex h-[10vh] w-[30vw] flex-row items-center justify-between px-[2vw] py-[2vh]">
          <label>Position:</label>
          <select
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="rounded border border-black"
          >
            <option value={"PG"}>PG</option>
            <option value={"SG"}>SG</option>
            <option value={"SF"}>SF</option>
            <option value={"PF"}>PF</option>
            <option value={"C"}>C</option>
          </select>
        </div>
        {/* Level */}
        <div className="flex h-[10vh] w-[30vw] flex-row items-center justify-between px-[2vw] py-[2vh]">
          <label>Level:</label>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="rounded border border-black"
          >
            <option value={"100"}>100</option>
            <option value={"200"}>200</option>
            <option value={"300"}>300</option>
            <option value={"400"}>400</option>
          </select>
        </div>
        {/* Department */}
        <div className="flex h-[10vh] w-[30vw] flex-row items-center justify-between px-[2vw] py-[2vh]">
          <label>Department:</label>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="h-full w-[12vw] rounded border border-black"
          >
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
            <option value={"Accounting"}> Accounting</option>
          </select>
        </div>
        {/* Team */}
        <div className="flex h-[10vh] w-[30vw] flex-row items-center justify-between px-[2vw] py-[2vh]">
          <label>Team:</label>
          <select
            value={team}
            onChange={(e) => setTeam(e.target.value)}
            className="rounded border border-black"
          >
            <option value={"Bluejays"}>Bluejays</option>
            <option value={"Cirok"}>Cirok</option>
            <option value={"Madiba"}>Madiba</option>
            <option value={"TSG"}>TSG</option>
          </select>
        </div>
        {/* Username */}
        <div className="flex h-[10vh] w-[30vw] flex-row items-center justify-between px-[2vw] py-[2vh]">
          <label>Username:</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="rounded border border-black"
          />
        </div>
        {/* Jersey */}
        <div className="flex h-[10vh] w-[30vw] flex-row items-center justify-between px-[2vw] py-[2vh]">
          <label>Jersey:</label>
          <input
            value={jersey}
            onChange={(e) => setJersey(e.target.value)}
            className="rounded border border-black"
            maxLength={11}
          />
        </div>
        <button
          onClick={addPlayer}
          className="rounded border border-black px-[2vw] py-[2vh]"
        >
          Sumbit
        </button>
      </div>
    </div>
  );
};

export default createplayers;
