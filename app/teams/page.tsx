import Header from "@/components/header";
import Navbar from "@/components/Navigation/navbar";
import Standings from "@/components/standings";

import React from "react";

const Teams = () => {
  return (
    <div className="flex flex-1 flex-col">
      <Header />
      <div className="flex flex-1 flex-row">
        <Navbar />
        <div className="flex h-full w-[92%] flex-col">
          <Standings />
        </div>
      </div>
    </div>
  );
};

export default Teams;
