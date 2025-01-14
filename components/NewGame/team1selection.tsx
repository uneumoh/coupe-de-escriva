import React, { Dispatch, SetStateAction } from "react";

interface Props {
  team1: string;
  team1players: string[];
  onFieldTeam1: string[];
  setOnfieldTeam1: Dispatch<SetStateAction<string[]>>;
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
  const setPlayerTeam1 = (player: string) => {
    if (onFieldTeam1.includes(player) || onFieldTeam1.length >= 5) return;

    setOnfieldTeam1((prev) => [...prev, player]);
    console.log(onFieldTeam1);
  };

  return (
    <div className="flex min-h-[85vh] flex-1 flex-row items-center bg-[#0F0050]">
      <div className="flex h-full w-[12.5%] flex-col items-start justify-between" />
      <div className="flex h-full w-[75%] flex-col justify-center">
        <div className="flex w-full flex-row justify-center">
          <div className="flex h-[6.5vh] w-[36vw] flex-row items-center justify-center rounded-[10px] bg-[#F5F5F5] text-center">
            <p className="text-[36px] font-extrabold">{team1} Selection</p>
          </div>
        </div>
        <div className="flex flex-row items-center justify-evenly">
          {team1players.map((player) => (
            <div
              key={player}
              className="m-[2vh] flex flex-row rounded-[10px]"
              onClick={() => setPlayerTeam1(player)}
            >
              <button className="w-[6vw] rounded-[10px] bg-[#FFC521]">
                <p className="text-[20px] font-bold">{player}</p>
              </button>
            </div>
          ))}
        </div>
        <div className="flex w-full flex-row justify-center">
          <div className="TeamSelection flex h-[60vh] w-full flex-row">
            <div className="flex flex-1">
              <div className="flex h-full w-full flex-col items-end justify-evenly pr-[10%]">
                {onFieldTeam1.map((player) => (
                  <div
                    key={player}
                    className="flex h-[7vh] w-[7vh] cursor-pointer items-center justify-center rounded-full bg-gray-500"
                    onClick={() => {
                      if (onFieldTeam1.length >= 5) return;
                      setOnfieldTeam1((prev) =>
                        prev.filter((e) => e != player),
                      );
                    }}
                  >
                    <p className="text-white">{player}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-1"></div>
          </div>
        </div>
      </div>
      <div className="mx-[0.65vw] flex h-full w-[12.5%] flex-col items-start justify-between">
        <div
          className="flex h-[6.5vh] w-full cursor-pointer items-center justify-center rounded-[10px] bg-red-500"
          onClick={() => {
            setIsTeam1Selection(false);
            setIsTeamsSelected(false);
          }}
        >
          <p className="font-bold text-white">back</p>
        </div>
        <div
          className="flex h-[6.5vh] w-full cursor-pointer items-center justify-center rounded-[10px] bg-green-500"
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
