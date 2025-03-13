"use client";
import Container from "@/components/Container";
import Header from "@/components/Headers/header";
import { useRouter } from "next/navigation";
import React from "react";

const Games = () => {
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
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingLeft: "5%",
          paddingRight: "5%",
        }}
      >
        <div className="flex h-[50%] w-full flex-col items-center justify-evenly rounded-[20px] bg-[#0F0050] font-bold">
          <div
            className="flex h-[15%] w-[90%] cursor-pointer flex-row items-center justify-center bg-[#FFC521]"
            onClick={() => handleNavigation("/admin/games/newgame")}
          >
            <p>New Game</p>
          </div>
          <div className="flex h-[15%] w-[90%] cursor-pointer flex-row items-center justify-center bg-[#FFC521]">
            <p>View Games</p>
          </div>
        </div>
        <div className="mt-[5%] flex h-[5%] w-full flex-row justify-center">
          <button
            className="h-full w-[20%] bg-red-500"
            onClick={() => router.push("/admin")}
          >
            Back
          </button>
        </div>
      </Container>
    </div>
  );
};

export default Games;
