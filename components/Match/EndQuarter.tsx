import React from "react";
interface props {
  endQuarter: () => void;
}

const EndQuarter = ({ endQuarter }: props) => {
  return (
    <>
      <div className="overlay"></div>
      <div className="absolute left-1/2 top-[20%] h-[25%] w-[75%] -translate-x-1/2 -translate-y-1/2 bg-white p-[10%]">
        <p>Are you sure you want to end quarter?</p>
        <div className="mt-[5%] flex flex-row justify-around">
          <button className="w-[25%] bg-green-500" onClick={endQuarter}>
            yes
          </button>
          <button className="w-[25%] bg-red-500">no</button>
        </div>
      </div>
    </>
  );
};

export default EndQuarter;
