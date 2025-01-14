import Header from "@/components/header";
import Navbar from "@/components/Navigation/navbar";
import PlayerTable from "@/components/playertable";
import React from "react";

const Players = () => {
  return (
    <div className="flex flex-1 flex-col">
      <Header />
      <div className="flex flex-1 flex-row">
        <Navbar />
        <div className="flex flex-1 flex-col">
          <PlayerTable />
        </div>
      </div>
    </div>
  );
};

export default Players;
