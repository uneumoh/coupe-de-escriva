import Header from "@/components/Headers/header";
import BottomNavBar from "@/components/Navigation/BottomNavBar";
import Standings from "@/components/Teams/standings";

import React from "react";

const Teams = () => {
  return (
    <div className="flex h-screen w-screen flex-col">
      <Header />
      <div className="flex h-[80%] flex-col">
        <Standings />
      </div>
      <BottomNavBar />
    </div>
  );
};

export default Teams;
