import React, { CSSProperties, ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  style?: CSSProperties;
}
const Container = ({ children, style }: ContainerProps) => {
  return (
    <div style={style} className="h-full w-full">
      {children}
    </div>
  );
};

export default Container;
