import React, { Dispatch, SetStateAction } from "react";
import Container from "../Container";

interface Player {
  firstname: string;
  lastname: string;
  number: string;
  position: string;
  level: string;
  department: string;
  team: string;
  username: string;
  jersey: string;
}

interface Props {
  team1: string;
  team1players: Player[];
  onFieldTeam1: Player[];
  setOnfieldTeam1: Dispatch<SetStateAction<Player[]>>;
  setIsTeamsSelected: Dispatch<SetStateAction<boolean>>;
  setIsTeam1Selection: Dispatch<SetStateAction<boolean>>;
  setIsTeam2Selection: Dispatch<SetStateAction<boolean>>;
}

const Team1Selection = ({
  team1,
  team1players,
  onFieldTeam1,
  setOnfieldTeam1,
  setIsTeamsSelected,
  setIsTeam1Selection,
  setIsTeam2Selection,
}: Props) => {
  // Setting OnField
  const setPlayerTeam1 = (player: Player) => {
    if (onFieldTeam1.includes(player) || onFieldTeam1.length >= 5) return;

    setOnfieldTeam1((prev) => [...prev, player]);
    console.log(onFieldTeam1);
  };

  return (
    <div className="h-full w-full bg-[#0F0051] pt-[10%]">
      <div className="flex w-full justify-center text-center">
        <div className="w-[80%] rounded-[10px] bg-[#F5F5F5]">
          <p className="text-nowrap text-[24px] font-extrabold">
            {team1} Selection
          </p>
        </div>
      </div>
      <div className="mt-[5%] flex h-[5%] w-full flex-row items-center justify-evenly pt-[2%]">
        {team1players.map((player) => (
          <div
            key={player.username}
            className="flex h-full w-[15%] cursor-pointer flex-row items-center justify-center rounded-[10px] bg-[#FFC521]"
            onClick={() => setPlayerTeam1(player)}
          >
            <p className="text-[12px] font-bold">
              {player.firstname + " " + player.lastname[0] + "."}
            </p>
          </div>
        ))}
      </div>
      <div className="TeamSelection mt-[15%] flex h-[40%] w-full flex-row">
        <div className="flex flex-1">
          <div className="flex h-full w-full flex-col items-end justify-evenly pr-[10%]">
            {onFieldTeam1.map((player) => (
              <div
                key={player.username}
                className="flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-full bg-gray-500"
                onClick={() => {
                  setOnfieldTeam1((prev) => prev.filter((e) => e != player));
                }}
              >
                <p className="text-white">
                  {player.firstname + " " + player.lastname[0] + "."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-[20%] flex h-[8%] flex-row justify-evenly">
        <div
          className="flex w-[25%] cursor-pointer items-center justify-center rounded-[10px] bg-red-500"
          onClick={() => {
            setIsTeam1Selection(false);
            setIsTeamsSelected(false);
          }}
        >
          <p className="font-bold text-white">back</p>
        </div>
        <div
          className="flex w-[25%] cursor-pointer items-center justify-center rounded-[10px] bg-green-500"
          onClick={() => {
            setIsTeam1Selection(false);
            setIsTeam2Selection(true);
          }}
        >
          <p className="font-bold text-white">next</p>
        </div>
      </div>
    </div>
  );
};

export default Team1Selection;
