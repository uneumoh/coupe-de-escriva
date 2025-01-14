import React, { Dispatch, SetStateAction } from "react";

interface Props {
  team2: string;
  team2players: string[];
  onFieldTeam2: string[];
  setOnfieldTeam2: Dispatch<SetStateAction<string[]>>;
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
  const setPlayerTeam2 = (player: string) => {
    if (onFieldTeam2.includes(player) || onFieldTeam2.length >= 5) return;

    setOnfieldTeam2((prev) => [...prev, player]);
    console.log(onFieldTeam2);
  };
  return (
    <div className="flex min-h-[85vh] flex-1 flex-row items-center bg-[#0F0050]">
      <div className="flex h-full w-[12.5%] flex-col items-start justify-between" />
      <div className="flex h-full w-[75%] flex-col justify-center">
        <div className="flex w-full flex-row justify-center">
          <div className="flex h-[6.5vh] w-[36vw] flex-row items-center justify-center rounded-[10px] bg-[#F5F5F5] text-center">
            <p className="text-[36px] font-extrabold">{team2} Selection</p>
          </div>
        </div>
        <div className="flex flex-row items-center justify-evenly">
          {team2players.map((player) => (
            <div
              key={player}
              className="m-[2vh] flex flex-row rounded-[10px]"
              onClick={() => setPlayerTeam2(player)}
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
                {onFieldTeam2.map((player) => (
                  <div
                    key={player}
                    className="flex h-[7vh] w-[7vh] cursor-pointer items-center justify-center rounded-full bg-gray-500"
                    onClick={() => {
                      if (onFieldTeam2.length >= 5) return;
                      setOnfieldTeam2((prev) =>
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
            setIsTeam2Selection(false);
            setIsTeam1Selection(true);
          }}
        >
          <p className="font-bold text-white">Back</p>
        </div>
        <div
          className="flex h-[6.5vh] w-full cursor-pointer items-center justify-center rounded-[10px] bg-green-500"
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
