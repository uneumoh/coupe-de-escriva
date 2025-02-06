"use client";
import Header from "@/components/header";
import { useRouter } from "next/navigation";
import React from "react";

const AdminPage = () => {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    if (router) {
      router.push(path);
    } else {
      console.error("Router is not availiable");
    }
  };
  return (
    <div className="flex h-screen w-screen flex-col">
      <Header />
      <div className="h-[90%] w-[100vw]">
        <div className="grid h-full w-full grid-cols-2 grid-rows-2">
          <div
            className="flex cursor-pointer items-center justify-center bg-[#0F0050] hover:bg-[#FFC521]"
            onClick={() => {
              handleNavigation("/admin/players");
            }}
          >
            <p className="text-[36px] font-bold text-white">Players</p>
          </div>

          <div
            className="flex cursor-pointer items-center justify-center bg-[#0F0050] hover:bg-[#FFC521]"
            onClick={() => handleNavigation("/admin/games")}
          >
            <p className="text-[36px] font-bold text-white">Games</p>
          </div>
          <div className="flex items-center justify-center bg-[#0F0050] hover:bg-[#FFC521]">
            <p className="text-[36px] font-bold text-white"> Teams</p>
          </div>
          <div className="flex items-center justify-center bg-[#0F0050] hover:bg-[#FFC521]">
            <p className="text-[36px] font-bold text-white"></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
