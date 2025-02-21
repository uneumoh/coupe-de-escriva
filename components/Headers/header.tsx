import React from "react";

const Header = () => {
  return (
    <div className="flex h-[10%] w-full flex-row items-center justify-center bg-[#0F0050]">
      <img src="/Logos/coupe.png" className="w-[10%]" />
      <h1 className="text-[32px] font-extrabold italic text-white">
        Coupe de Escriva
      </h1>
    </div>
  );
};

export default Header;
