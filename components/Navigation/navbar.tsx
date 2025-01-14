import Image from "next/image";
import React from "react";
import home from "@/public/navbar/home.svg";
import players from "@/public/navbar/players.svg";
import games from "@/public/navbar/games.svg";
import teams from "@/public/navbar/teams.svg";
import settings from "@/public/navbar/settings.svg";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex h-[85vh] w-[8%] flex-col bg-[#0F0050]">
      <div className="flex flex-1 items-center justify-center border border-black bg-[#FFC521]">
        <Link href={"/"}>
          <Image src={home} height={50} width={50} alt="" />
        </Link>
      </div>
      <div className="flex flex-1 items-center justify-center border border-black bg-[#FFC521]">
        <Link href={"/players"}>
          <Image src={players} height={50} width={50} alt="" />
        </Link>
      </div>
      <div className="flex flex-1 items-center justify-center border border-black bg-[#FFC521]">
        <Image src={games} height={50} width={50} alt="" />
      </div>
      <div className="flex flex-1 items-center justify-center border border-black bg-[#FFC521]">
        <Link href={"/teams"}>
          <Image src={teams} height={50} width={50} alt="" />
        </Link>
      </div>

      <div className="flex flex-1 items-center justify-center border border-black bg-[#FFC521]">
        <Image src={settings} height={50} width={50} alt="" />
      </div>
    </div>
  );
};

export default Navbar;
