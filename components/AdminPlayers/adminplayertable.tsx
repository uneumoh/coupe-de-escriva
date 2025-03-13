"use client";
import firebase from "@/firebase/clientApp";
import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import Image from "next/image";
import editButton from "@/public/images/editbutton.svg";
import deleteButton from "@/public/images/trashcan.svg";
import closeButton from "@/public/images/close-button.svg";
import { Roboto_Condensed } from "next/font/google";
import CreatePlayers from "./createplayers";

const db = getFirestore(firebase);
const colRef = collection(db, "basketballplayers");

const roboto = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["400", "700"],
});

interface PlayerType {
  firstname: string;
  lastname: string;
  position: string;
  number: string;
  department: string;
  level: string;
  team: string;
  username: string;
  jersey: string;
}

interface FilterType {
  name: string;
  level: string;
  department: string;
  team: string;
}

const AdminPlayerTable = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [team, setTeam] = useState("");
  const [level, setLevel] = useState("");
  const [department, setDepartment] = useState("");
  const [number, setNumber] = useState("");
  const [position, setPosition] = useState("");
  const [jersey, setJersey] = useState("");
  const [username, setUsername] = useState("");
  const [players, setPlayers] = useState<PlayerType[]>([]);
  const [filteredPlayers, setFilteredPlayers] = useState<PlayerType[]>([]);

  const [select, setSelect] = useState<FilterType>({
    name: "",
    level: "",
    department: "",
    team: "",
  });

  const [createPlayerModal, setCreatePlayerModal] = useState(false);
  const [editPlayerModal, setEditPlayerModal] = useState(false);
  const [deletePlayerModal, setDeletePlayerModal] = useState(false);

  useEffect(() => {
    getTable();
  }, []);

  const getTable = async () => {
    try {
      const snapshot = await getDocs(colRef);
      const playersData: PlayerType[] = [];

      snapshot.forEach((doc) => {
        const data = doc.data();
        playersData.push(data as PlayerType);
      });

      setPlayers(playersData);
      setFilteredPlayers(playersData);
    } catch (error) {
      console.error("Error fetching players:", error);
    }
  };

  const resetPlayer = () => {
    setFirstName("");
    setLastName("");
    setNumber("");
    setPosition("");
    setLevel("");
    setDepartment("");
    setTeam("");
    setUsername("");
    setJersey("");
  };

  const editPlayer = async (editUsername: string) => {
    try {
      const playerDocRef = doc(db, "basketballplayers", editUsername);

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
      await updateDoc(playerDocRef, data);
      alert("Player Updated Successfully");
      resetPlayer();
      setEditPlayerModal(false);
    } catch (error) {
      console.error("Error updataing player:", error);
    }
  };

  const setPlayer = ({
    firstname,
    lastname,
    level,
    department,
    position,
    team,
    username,
    number,
    jersey,
  }: PlayerType) => {
    setFirstName(firstname);
    setLastName(lastname);
    setNumber(number);
    setPosition(position);
    setLevel(level);
    setDepartment(department);
    setTeam(team);
    setUsername(username);
    setJersey(jersey);
  };

  const getPlayer = async (playerUsername: string) => {
    try {
      const playerDocRef = doc(db, "basketballplayers", playerUsername);
      const docSnapshot = await getDoc(playerDocRef);

      if (docSnapshot.exists()) {
        const data = docSnapshot.data() as PlayerType;
        console.log(data);
        setPlayer(data);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error getting player:", error);
    }
  };

  // Delete Player Function
  const deletePlayer = async (playerUsername: string) => {
    try {
      const playerDocRef = doc(db, "basketballplayers", playerUsername);

      await deleteDoc(playerDocRef);
      alert("Player Successfully Deleted");
    } catch (error) {
      console.error("Error Deleting Player:", error);
    }
  };

  const handleDelete = (username: string) => {
    setDeletePlayerModal(true);
    setUsername(username);
  };

  // Example usage in a form or UI interaction
  useEffect(() => {
    const filtered = players.filter((player) => {
      return (
        (select.team === "" || player.team === select.team) &&
        (select.level === "" || player.level === select.level) &&
        (select.department === "" || player.department === select.department) &&
        (select.name === "" ||
          player.firstname.toLowerCase().includes(select.name.toLowerCase()) ||
          player.lastname.toLowerCase().includes(select.name.toLowerCase()))
      );
    });

    setFilteredPlayers(filtered);
  }, [select, players]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setSelect((prev) => ({
      ...prev, // Keep the previous state
      [name]: value, // Update the specific field
    }));
  };
  return (
    <div className="flex h-full w-full flex-col px-[5%] pt-[5%]">
      {/* Create Player */}
      {createPlayerModal && (
        <CreatePlayers
          setCreatePlayerModal={setCreatePlayerModal}
          getTable={getTable}
        />
      )}
      {/* Edit Player */}
      {editPlayerModal && (
        <>
          <div className="overlay" />
          <div className="modal">
            <div className="flex flex-row justify-end">
              <Image
                src={closeButton}
                height={20}
                width={20}
                className="cursor-pointer"
                alt="close button"
                onClick={() => {
                  setEditPlayerModal(false);
                  resetPlayer();
                }}
              ></Image>
            </div>
            <div className="flex h-[85%] flex-col justify-evenly">
              {/* First Name */}
              <div className="flex h-[8vh] w-[30vw] flex-row items-center justify-between px-[2vw] py-[2vh]">
                <label>First Name:</label>
                <input
                  value={firstname}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="rounded border border-black"
                />
              </div>
              {/* Last Name */}
              <div className="flex h-[8vh] w-[30vw] flex-row items-center justify-between px-[2vw] py-[2vh]">
                <label>Last Name:</label>
                <input
                  value={lastname}
                  onChange={(e) => setLastName(e.target.value)}
                  className="rounded border border-black"
                />
              </div>
              {/* Number */}
              <div className="flex h-[8vh] w-[30vw] flex-row items-center justify-between px-[2vw] py-[2vh]">
                <label>Number:</label>
                <input
                  type="number"
                  value={number}
                  min={0}
                  max={100}
                  onChange={(e) => {
                    if (+e.target.value == 100) setNumber("00");
                    else setNumber(e.target.value);
                  }}
                  className="rounded border border-black"
                ></input>
              </div>
              {/* Position */}
              <div className="flex h-[8vh] w-[30vw] flex-row items-center justify-between px-[2vw] py-[2vh]">
                <label>Position:</label>
                <select
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="rounded border border-black"
                >
                  <option value="">Select Position</option>
                  <option value={"PG"}>PG</option>
                  <option value={"SG"}>SG</option>
                  <option value={"SF"}>SF</option>
                  <option value={"PF"}>PF</option>
                  <option value={"C"}>C</option>
                </select>
              </div>
              {/* Level */}
              <div className="flex h-[8vh] w-[30vw] flex-row items-center justify-between px-[2vw] py-[2vh]">
                <label>Level:</label>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="rounded border border-black"
                >
                  <option value="">Select Level</option>
                  <option value={"100"}>100</option>
                  <option value={"200"}>200</option>
                  <option value={"300"}>300</option>
                  <option value={"400"}>400</option>
                  <option value={"500"}>400</option>
                </select>
              </div>
              {/* Department */}
              <div className="flex h-[8vh] w-[30vw] flex-row items-center justify-between px-[2vw] py-[2vh]">
                <label>Department:</label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="h-full w-[12vw] rounded border border-black"
                >
                  <option value="">Select Department</option>
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
              <div className="flex h-[8vh] w-[30vw] flex-row items-center justify-between px-[2vw] py-[2vh]">
                <label>Team:</label>
                <select
                  value={team}
                  onChange={(e) => setTeam(e.target.value)}
                  className="rounded border border-black"
                >
                  <option value="">Select Team</option>
                  <option value={"Bluejays"}>Bluejays</option>
                  <option value={"Cirok"}>Cirok</option>
                  <option value={"Madiba"}>Madiba</option>
                  <option value={"TSG"}>TSG</option>
                </select>
              </div>

              {/* Jersey */}
              <div className="flex h-[8vh] w-[30vw] flex-row items-center justify-between px-[2vw] py-[2vh]">
                <label>Jersey:</label>
                <input
                  value={jersey}
                  onChange={(e) => setJersey(e.target.value)}
                  className="rounded border border-black"
                  maxLength={11}
                />
              </div>
            </div>
            <div className="flex w-full justify-center">
              <button
                onClick={() => editPlayer(username)}
                className="rounded border border-black px-[2vw] py-[2vh]"
              >
                Sumbit
              </button>
            </div>
          </div>
        </>
      )}
      {/* Delete Player */}
      {deletePlayerModal && (
        <>
          <div className="overlay" />
          <div className="modal">
            <div className="flex flex-col">
              <div>Are you sure you want to delete {username}</div>
              <div>
                <div
                  onClick={() => {
                    deletePlayer(username);
                  }}
                >
                  Yes
                </div>{" "}
                <div
                  onClick={() => {
                    setDeletePlayerModal(false);
                    resetPlayer();
                  }}
                ></div>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="flex h-[40%] w-full flex-col justify-between bg-white md:h-[8%] md:flex-row">
        <input
          value={select.name}
          name="name"
          onChange={(e) => handleInputChange(e)}
          className="h-[20%] w-full rounded border border-black bg-[#D9D9D9]"
          placeholder="Search player by name"
        />

        <select
          value={select.team}
          name="team"
          onChange={(e) => {
            handleInputChange(e);
          }}
          className="h-[20%] w-full rounded border border-black bg-[#D9D9D9]"
        >
          <option value="">Select Team</option>
          <option value="Madiba">Madiba</option>
          <option value="Bluejays">Bluejays</option>
          <option value="Cirok">Cirok</option>
          <option value="TSG">TSG</option>
        </select>

        <select
          value={select.level}
          name="level"
          onChange={(e) => {
            handleInputChange(e);
          }}
          className="h-[20%] w-full rounded border border-black bg-[#D9D9D9]"
        >
          <option value="">Select Level</option>
          <option value="100">100</option>
          <option value="200">200</option>
          <option value="300">300</option>
          <option value="400">400</option>
        </select>

        <select
          value={select.department}
          name="department"
          onChange={(e) => {
            handleInputChange(e);
          }}
          className="h-[20%] w-full rounded border border-black bg-[#D9D9D9]"
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

        <div
          className="flex h-[10%] items-center justify-center bg-[#0F0050] hover:cursor-pointer"
          onClick={() => {
            setCreatePlayerModal(true);
            resetPlayer();
          }}
        >
          <p className="font-bold text-white">Add New</p>
        </div>
      </div>
      <div className="mt-[10%] h-[60%] w-full overflow-scroll bg-[#0F0050] md:mt-[5%]">
        <table className="w-full border-collapse border border-black">
          <thead>
            <tr className={`bg-[#FFC521] text-[12px] ${roboto.className}`}>
              <th>Player</th>
              <th>Player</th>
              <th>Team</th>
              <th>Level</th>
              <th>Department</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody className="border-collapse border-black bg-white text-[12px]">
            {filteredPlayers.map((player) => (
              <tr key={player.username} className="h-[5vh] border border-black">
                <td className="w-[10%]">
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
                {/* Edit Button */}
                <td className="w-[5%] cursor-pointer border border-black">
                  <div
                    className="flex items-center justify-center"
                    onClick={() => {
                      getPlayer(player.username);
                      setEditPlayerModal(true);
                    }}
                  >
                    <Image src={editButton} width={20} height={20} alt="Edit" />
                  </div>
                </td>
                {/* Delete Button */}
                <td className="w-[5%] cursor-pointer border border-black">
                  <div
                    className="flex items-center justify-center"
                    onClick={() => {
                      handleDelete(player.username);
                    }}
                  >
                    <Image
                      src={deleteButton}
                      width={20}
                      height={20}
                      alt="Delete"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPlayerTable;
