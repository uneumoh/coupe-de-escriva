import React from "react";

import { ReactNode } from "react";

const PlayerIcon = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-[8vh] w-[8vh] cursor-pointer items-center justify-center rounded-full bg-[#0F0050] text-[12px]">
      {children}
    </div>
  );
};

export default PlayerIcon;
