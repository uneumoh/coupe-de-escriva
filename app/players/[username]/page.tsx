"use client";
import type { Player } from "@/app/types/match";
import firebase from "@/firebase/clientApp";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/header";

const db = getFirestore(firebase);

const PlayerModal = () => {
  const params = useParams();
  const username = params?.username as string;
  const [activePlayer, setActivePlayer] = useState<Player | null>(null);

  useEffect(() => {
    const getPlayer = async () => {
      const playerRef = doc(db, "basketballplayers", username);
      const data = await getDoc(playerRef).then((doc) => doc.data());
      setActivePlayer(data as Player);
    };
    getPlayer();
  }, [username]);
  return (
    <div className="flex h-screen w-screen flex-col">
      <Header />
      <div className="flex h-[90%] items-center justify-center px-[10%]">
        <div className="flex h-[75%] w-full flex-col bg-[#0F0051]">
          <div className="flex h-1/2 w-full flex-row">
            <div className="flex w-1/2"></div>
            <div className="flex w-1/2 flex-col text-white">
              <p className="font-bold">
                {activePlayer?.team} | #{activePlayer?.number} |{" "}
                {activePlayer?.position}
              </p>
              <p className="font-extrabold">
                {activePlayer?.firstname}
                <span className="block">{activePlayer?.lastname}</span>
              </p>
            </div>
          </div>
          <div className="flex flex-row justify-around font-bold text-white">
            <div className="flex flex-col"> PTS</div>
            <div className="flex flex-col"> AST</div>
            <div className="flex flex-col"> REB</div>
            <div className="flex flex-col"> STL</div>
            <div className="flex flex-col"> BLK</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerModal;
