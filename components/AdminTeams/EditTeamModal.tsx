import firebase from "@/firebase/clientApp";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

interface Props {
  editTeam: string;
  setEditTeam: Dispatch<SetStateAction<string>>;
  setEditTeamModal: Dispatch<SetStateAction<boolean>>;
}

interface TeamDetails {
  played: number;
  wins: number;
  position: number;
}

const db = getFirestore(firebase);
const EditTeamModal = ({ editTeam, setEditTeam, setEditTeamModal }: Props) => {
  const [teamDetails, setTeamDetails] = useState({
    played: 0,
    wins: 0,
    position: 0,
  });

  const getTeamDetails = async () => {
    const docRef = doc(db, "teams", editTeam);
    const data = (await getDoc(docRef).then((doc) =>
      doc.data(),
    )) as TeamDetails;
    setTeamDetails(data);
  };

  useEffect(() => {
    getTeamDetails();
  }, []);

  const saveEdit = (newDetails: TeamDetails) => {
    const docRef = doc(db, "teams", editTeam);
    setDoc(docRef, newDetails);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeamDetails({ ...teamDetails, [e.target.name]: e.target.value });
  };
  return (
    <div className="flex h-full w-full flex-col items-center">
      <div className="flex h-[10%] w-full flex-row justify-end">
        <p
          className="cursor-pointer"
          onClick={() => {
            setEditTeamModal(false);
            setEditTeam("");
          }}
        >
          close
        </p>
      </div>
      <div className="flex h-[90%] flex-col justify-evenly">
        <div>
          <label htmlFor="played">Played:</label>
          <input
            type="text"
            pattern=""
            name="played"
            value={teamDetails.played}
            onChange={handleChange}
            className="rounded-lg border"
          />
        </div>
        <div>
          <label htmlFor="wins">wins: </label>
          <input
            type="text"
            pattern=""
            className="rounded-lg border"
            name="wins"
            value={teamDetails.wins}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="position">position: </label>
          <input
            type="text"
            pattern=""
            className="rounded-lg border"
            name="position"
            value={teamDetails.position}
            onChange={handleChange}
          />
        </div>
        <div className="flex w-full justify-center">
          <button
            className="w-1/4 bg-green-500"
            onClick={() => {
              saveEdit(teamDetails);
              setEditTeamModal(false);
              setEditTeam("");
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTeamModal;
