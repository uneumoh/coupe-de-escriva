"use client";
import React from "react";
import AdminPlayerTable from "@/components/adminplayertable";
import { useRouter } from "next/navigation";
import Header from "@/components/header";

const AdminPlayers = () => {
  const router = useRouter();

  return (
    <div className="flex h-screen w-screen flex-col">
      <Header />
      <div className="mb-[5%] flex h-[75%] flex-col">
        <AdminPlayerTable />
      </div>
      <div className="flex h-[5%] w-full flex-row justify-end pr-[5%] md:h-[10%]">
        <div
          className="flex h-full w-[15%] cursor-pointer items-center justify-center rounded-lg bg-red-500 font-semibold text-white"
          onClick={() => router.push("/admin")}
        >
          Back
        </div>
      </div>
    </div>
  );
};

export default AdminPlayers;
