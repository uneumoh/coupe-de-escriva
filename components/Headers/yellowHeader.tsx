import Image from "next/image";
import React from "react";

const YellowHeader = () => {
  return (
    <div className="flex h-[10%] w-full flex-row items-center justify-center bg-[#ffcb38]">
      <div className="h-full w-[10%]">
        <Image src="/Logos/coupe.png" fill alt="logo" />
      </div>
      <h1 className="text-[32px] font-extrabold italic text-[#0F0051]">
        Coupe de Escriva
      </h1>
    </div>
  );
};

export default YellowHeader;
