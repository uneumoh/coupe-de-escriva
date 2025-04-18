import Header from "@/components/Headers/header";
import BottomNavBar from "@/components/Navigation/BottomNavBar";
import PlayerTable from "@/components/Players/playertable";
import React from "react";

const Players = () => {
  return (
    <div className="flex h-screen w-screen flex-col">
      <Header />
      <PlayerTable />
      <BottomNavBar />
    </div>
  );
};

export default Players;
