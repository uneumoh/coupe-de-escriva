import React, { Dispatch, SetStateAction } from "react";

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
  draftpick: string;
}

interface Props {
  team2: string;
  team2players: Player[];
  onFieldTeam2: Player[];
  setOnfieldTeam2: Dispatch<SetStateAction<Player[]>>;
  setIsTeam1Selection: Dispatch<SetStateAction<boolean>>;
  setIsTeam2Selection: Dispatch<SetStateAction<boolean>>;
  setSelectGameSettings: Dispatch<SetStateAction<boolean>>;
}

const Team2Selection = ({
  team2,
  team2players,
  onFieldTeam2,
  setOnfieldTeam2,
  setIsTeam1Selection,
  setIsTeam2Selection,
  setSelectGameSettings,
}: Props) => {
  // Setting OnField
  const setPlayerTeam2 = (player: Player) => {
    if (onFieldTeam2.includes(player) || onFieldTeam2.length >= 5) return;

    setOnfieldTeam2((prev) => [...prev, player]);
    console.log(onFieldTeam2);
  };

  return (
    <div className="h-full w-full bg-[#0F0051] pt-[10%]">
      <div className="flex w-full justify-center text-center">
        <div className="w-[80%] rounded-[10px] bg-[#F5F5F5]">
          <p className="text-nowrap text-[24px] font-extrabold">
            {team2} Selection
          </p>
        </div>
      </div>
      <div className="mt-[5%] flex h-[5%] w-full flex-row items-center justify-evenly pt-[2%]">
        {team2players.map((player) => (
          <div
            key={player.username}
            className="flex h-full w-[15%] cursor-pointer flex-row items-center justify-center rounded-[10px] bg-[#FFC521]"
            onClick={() => setPlayerTeam2(player)}
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
            {onFieldTeam2.map((player) => (
              <div
                key={player.username}
                className="flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-full bg-gray-500"
                onClick={() => {
                  setOnfieldTeam2((prev) => prev.filter((e) => e != player));
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
            setIsTeam2Selection(false);
            setIsTeam1Selection(true);
          }}
        >
          <p className="font-bold text-white">Back</p>
        </div>
        <div
          className="flex w-[25%] cursor-pointer items-center justify-center rounded-[10px] bg-green-500"
          onClick={() => {
            setIsTeam2Selection(false);
            setSelectGameSettings(true);
          }}
        >
          <p className="font-bold text-white">Next</p>
        </div>
      </div>
    </div>
  );
};

export default Team2Selection;
