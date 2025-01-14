import React from "react";

interface EventTableProps {
  team1: string;
  team2: string;
}

const EventTable = ({ team1, team2 }: EventTableProps) => {
  return (
    <div className="h-full w-1/2 bg-[#0F0050]">
      <div className="flex w-full items-center justify-center">
        <p className="text-[14px] font-bold text-white">
          {team1} vs {team2}
        </p>
      </div>
    </div>
  );
};

export default EventTable;
