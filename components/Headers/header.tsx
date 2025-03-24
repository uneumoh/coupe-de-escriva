import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <div className="flex h-[10%] w-full flex-row items-center justify-evenly bg-[#0F0050] px-[10%]">
      <div className="relative h-[10vw] w-[10%]">
        <Image src="/Logos/coupe.png" fill alt="logo" />
      </div>
      <h1 className="text-[32px] font-extrabold italic text-white">
        Coupe de Escriva
      </h1>
    </div>
  );
};

export default Header;
