"use client";
import React, { useEffect, useState } from "react";
import AdminPlayerTable from "@/components/adminplayertable";
import { useRouter } from "next/navigation";

const AdminPlayers = () => {
  const router = useRouter();

  return (
    <div className="flex flex-1 flex-col">
      <div className="mb-[5%] flex h-[75%] flex-col">
        <AdminPlayerTable />
      </div>
      <div className="flex h-[10%] flex-row justify-end pr-[5%]">
        <div
          className="flex w-[10%] cursor-pointer items-center justify-center rounded-lg bg-red-500 font-semibold text-white"
          onClick={() => router.push("/admin")}
        >
          Back
        </div>
      </div>
    </div>
  );
};

export default AdminPlayers;
