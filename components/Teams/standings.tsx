import React from "react";
import StandingsRows from "./StandingsRows";
import { Roboto_Condensed } from "next/font/google";
const roboto = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const Standings = () => {
  return (
    <div className="flex h-full w-full flex-col justify-center">
      <div className="flex h-3/4 flex-col items-center">
        <div className="w-[90%]">
          <p className={`${roboto.className} font-bold text-[#0F0051]`}>
            Standings
          </p>
        </div>
        <div className="flex w-[90%] flex-col items-center">
          <table className="w-full border border-[#0F0050] text-[14px]">
            <thead className="bg-[#0F0050] text-white">
              <tr>
                <th className="w-[10%]">POS</th>
                <th className="w-[20%]">Teams</th>
                <th className="w-[10%]">P</th>
                <th className="w-[10%]">W</th>
                <th className="w-[10%]">L</th>
                <th className="w-[10%]">WPG</th>
                <th className="w-[10%]">PTS</th>
                <th className="w-[20%]">Form</th>
              </tr>
            </thead>
            <StandingsRows />
          </table>
        </div>
      </div>
    </div>
  );
};

export default Standings;
