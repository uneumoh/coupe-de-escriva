"use client";
import React, { useState } from "react";

interface HomeScreenPlayerNumberProps {
  playerNumber: string;
}

const HomeScreenPlayerNumber = ({
  playerNumber,
}: HomeScreenPlayerNumberProps) => {
  return (
    <div className="flex h-[40%] w-full items-center justify-center rounded-br-[5px] bg-[#FFC521]">
      <p className="text-[40px] font-bold">{playerNumber}</p>
    </div>
  );
};

export default HomeScreenPlayerNumber;
