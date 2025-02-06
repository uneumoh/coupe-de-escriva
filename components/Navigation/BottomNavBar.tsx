"use client";
import { useRouter } from "next/navigation";
import React, { use } from "react";

const BottomNavBar = () => {
  const navigate = useRouter();
  return (
    <div className="flex h-[10%] w-full flex-row items-center justify-evenly bg-[#0F0050] text-white">
      <div className="flex h-[80%] w-[95%] items-center justify-evenly rounded-full bg-white text-black">
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
    </div>
  );
};

export default BottomNavBar;
