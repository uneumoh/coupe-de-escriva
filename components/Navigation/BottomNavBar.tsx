"use client";
import { useRouter } from "next/navigation";
import React, { use } from "react";

const BottomNavBar = () => {
  const navigate = useRouter();
  return (
    <div className="flex h-[10%] w-full flex-row items-center justify-evenly bg-[#0F0050] text-white">
      <div>Home</div>
      <div
        onClick={() => {
          navigate.push("/players");
        }}
      >
        Players
      </div>
      <div>Teams</div>
      <div>Games</div>
      <div>Settings</div>
    </div>
  );
};

export default BottomNavBar;
