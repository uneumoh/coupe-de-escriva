import React from "react";

const ControlBar = ({ firstname }: { firstname: string }) => {
  return (
    <div className="mx-[3vw] mt-[6.5vh] flex h-[12vh] flex-row items-center rounded-[20px] bg-[#0F0050]">
      <div className="w-[25%]">
        <p className="text-[15px] text-white">{firstname}</p>
      </div>
      <div className="flex w-[50%] flex-row justify-evenly">
        <div className="cursor-pointerh-[10vh] flex w-[10vh] items-center justify-center rounded-full bg-[#FFC521]">
          <p className="text-[15px] font-bold text-black">+1</p>
        </div>
        <div className="flex h-[10vh] w-[10vh] cursor-pointer items-center justify-center rounded-full bg-[#FFC521]">
          <p className="text-[15px] font-bold text-black">+2</p>
        </div>
        <div className="flex h-[10vh] w-[10vh] cursor-pointer items-center justify-center rounded-full bg-[#FFC521]">
          <p className="text-[15px] font-bold text-black">+3</p>
        </div>
        <div className="flex h-[10vh] w-[10vh] cursor-pointer items-center justify-center rounded-full bg-[#FFC521]">
          <p className="text-[15px] font-bold text-black">+1 ass</p>
        </div>
        <div className="flex h-[10vh] w-[10vh] cursor-pointer items-center justify-center rounded-full bg-[#FFC521]">
          <p className="text-[15px] font-bold text-black">+1 reb</p>
        </div>
        <div className="flex h-[10vh] w-[10vh] cursor-pointer items-center justify-center rounded-full bg-[#FFC521]">
          <p className="text-[15px] font-bold text-black">+1 stl</p>
        </div>
        <div className="flex h-[10vh] w-[10vh] cursor-pointer items-center justify-center rounded-full bg-[#FFC521]">
          <p className="text-[15px] font-bold text-black">+1 blk</p>
        </div>
        <div className="flex h-[10vh] w-[10vh] cursor-pointer items-center justify-center rounded-full bg-[#FFC521]">
          <p className="text-[15px] font-bold text-black">+1 foul</p>
        </div>
      </div>
    </div>
  );
};

export default ControlBar;
