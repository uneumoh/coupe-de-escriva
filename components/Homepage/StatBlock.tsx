import React from "react";

import { ReactNode } from "react";

const StatBlock = ({ children }: { children: ReactNode }) => {
  return <div className="bg-[#FFC521] font-bold text-black">{children}</div>;
};

export default StatBlock;
