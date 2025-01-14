import React, { CSSProperties, ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  style?: CSSProperties;
}
const Container = ({ children, style }: ContainerProps) => {
  return (
    <div style={style} className="h-[80%] px-[10%] pt-[10%]">
      {children}
    </div>
  );
};

export default Container;
