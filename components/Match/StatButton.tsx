import React, { ReactNode } from "react";

interface StatButtonProps {
  children: ReactNode;
  onClick?: () => void;
}

const StatButton = ({ children, onClick }: StatButtonProps) => {
  return (
    <div
      className="flex w-[12%] flex-col items-center justify-center bg-green-500"
      onClick={() => {
        onClick?.();
      }}
    >
      {children}
    </div>
  );
};

export default StatButton;
