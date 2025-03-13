"use client";
import { useRouter } from "next/navigation";
import React from "react";

const BottomNavBar = () => {
  const navigate = useRouter();
  return (
    <div className="flex h-[10%] w-full flex-row items-center justify-evenly bg-[#0F0050] text-white">
      <div className="flex h-[80%] w-[95%] items-center justify-evenly rounded-full bg-white text-black">
        <div
          className="flex flex-1 cursor-pointer"
          onClick={() => {
            navigate.push("/");
          }}
        >
          Home
        </div>
        <div
          className="flex flex-1"
          onClick={() => {
            navigate.push("/players");
          }}
        >
          Players
        </div>
        <div
          className="flex flex-1"
          onClick={() => {
            navigate.push("/teams");
          }}
        >
          Teams
        </div>
        <div
          className="flex flex-1"
          onClick={() => {
            navigate.push("/games");
          }}
        >
          Games
        </div>
        <div className="flex flex-1">Settings</div>
      </div>
    </div>
  );
};

export default BottomNavBar;
