import React from "react";
import StandingsRows from "./StandingsRows";

const Standings = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <table className="h-3/4 w-3/4 border border-[#0F0050]">
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
  );
};

export default Standings;
