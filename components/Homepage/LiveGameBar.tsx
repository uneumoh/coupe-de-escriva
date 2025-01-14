"use client";
import React, { useState } from "react";

const LiveGameBar = () => {
  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");
  return (
    <div className="h-[20%] w-auto rounded-[5px] bg-[#0F0050]">
      <div className="h-[25px] w-auto rounded-t-[5px] bg-[#FFC521] font-bold">
        Live Fixture
      </div>
      <div className="flex h-[80%] flex-row items-center justify-between p-[2%]">
        <div className="flex h-full w-full items-center justify-evenly rounded-[5px] bg-white">
          <p className="text-[14px] font-bold text-black">
            {team1} vs {team2}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LiveGameBar;
