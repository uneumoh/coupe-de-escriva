import Header from "@/components/header";
import Navbar from "@/components/Navigation/navbar";
import PlayerTable from "@/components/Players/playertable";
import React from "react";

const Players = () => {
  return (
    <div className="flex h-screen w-screen flex-col">
      <Header />
      <PlayerTable />
    </div>
  );
};

export default Players;
