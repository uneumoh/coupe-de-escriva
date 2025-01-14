"use client";
import React, { useState } from "react";
import StatBlock from "./StatBlock";
import HomeScreenPlayerNumber from "./homescreenplayernumber";

const MVP = () => {
  const [playerInfo, setPlayerInfo] = useState({
    name: "",
    team: "",
    position: "",
    level: "400",
    department: "",
  });
  const [stats, setStats] = useState({
    points: 0,
    rebounds: 0,
    assists: 0,
    steals: 0,
    blocks: 0,
  });
  return (
    <div className="mt-[10%] h-[60%] rounded-[5px] bg-[#0F0050]">
      <div className="h-[25px] rounded-t-[5px] bg-[#FFC521]">
        <h1 className="font-bold text-black">MVP</h1>
      </div>
      <div className="h-[94%]">
        <div className="flex h-full w-full flex-row rounded-[5px]">
          <div className="flex h-1/2 w-1/4 flex-col justify-evenly">
            <StatBlock>{stats.points} pts</StatBlock>
            <StatBlock>{stats.assists} ast</StatBlock>
            <StatBlock>{stats.rebounds} reb</StatBlock>
            <StatBlock>{stats.steals} stl</StatBlock>
            <StatBlock>{stats.blocks} blk</StatBlock>
          </div>
          <div className="w-1/2"></div>
          <div className="flex w-1/4 flex-col items-center justify-between">
            <div className="flex h-[60%] w-full flex-col items-center">
              <div className="flex h-[38%] w-full rounded-full bg-white"></div>
              <p className="text-[36px] font-bold text-white">
                {playerInfo.level}
              </p>
              <p>{playerInfo.department}</p>
            </div>
            <HomeScreenPlayerNumber playerNumber="00" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MVP;
