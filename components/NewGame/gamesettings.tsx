import React, { FormEvent, Dispatch, SetStateAction, useEffect } from "react";

interface GameSettingsType {
  gametype: string;
  foullimit: string;
  timeoutsfirsthalf: string;
  timeoutssecondhalf: string;
}

interface Props {
  setSelectGameSettings: Dispatch<SetStateAction<boolean>>;
  setStartMatch: Dispatch<SetStateAction<boolean>>;
  setIsTeam2Selection: Dispatch<SetStateAction<boolean>>;
  gameSettings: GameSettingsType;
  setGamesSettings: Dispatch<SetStateAction<GameSettingsType>>;
}

const GameSettings = ({
  setSelectGameSettings,
  setStartMatch,
  setIsTeam2Selection,
  gameSettings,
  setGamesSettings,
}: Props) => {
  const handleGameSettingsSubmit = (e: FormEvent) => {
    if (
      gameSettings.gametype === "" ||
      gameSettings.foullimit === "" ||
      gameSettings.timeoutsfirsthalf === "" ||
      gameSettings.timeoutssecondhalf === ""
    ) {
      alert("Complete all fields");
      return;
    }
    e.preventDefault();
    setSelectGameSettings(false);
    setStartMatch(true);
  };

  useEffect(() => {
    console.log("Game Settings Updated:", gameSettings);
  }, [gameSettings]);

  return (
    <div className="m-[5vh] flex min-h-[75vh] flex-1 flex-col rounded-[20px] bg-[#0F0050] pb-[4vh]">
      <form
        className="mt-[5vh] flex h-full w-full flex-col"
        onSubmit={(e) => handleGameSettingsSubmit(e)}
      >
        {/* Game Type */}
        <div className="flex h-[90%] flex-col gap-[2.6vh]">
          <div className="flex h-[6.5vh] flex-row items-center">
            <div className="flex h-full w-[20%] flex-row items-center justify-center">
              <label htmlFor="GameType" className="font-bold text-white">
                GameType:
              </label>
            </div>
            <div className="flex h-full w-[80%] flex-row items-center p-[2%]">
              <select
                name="GameType"
                className="h-[6.5vh] w-full rounded-[10px]"
                value={gameSettings.gametype}
                onChange={(e) =>
                  setGamesSettings({
                    ...gameSettings,
                    gametype: e.target.value,
                  })
                }
              >
                <option value={""}>Select Game Type</option>
                <option value={"regular"}>Regular</option>
                <option value={"playoff"}>Playoff</option>
                <option value={"final"}>Final</option>
              </select>
            </div>
          </div>
          {/* Foul Limit */}
          <div className="flex h-[6.5vh] flex-row items-center">
            <div className="flex h-full w-[20%] flex-row items-center justify-center">
              <label htmlFor="FoulLimit" className="font-bold text-white">
                Foul Limit:
              </label>
            </div>
            <div className="flex h-full w-[80%] flex-row items-center p-[2%]">
              <input
                type="number"
                min={1}
                max={6}
                value={gameSettings.foullimit}
                onChange={(e) =>
                  setGamesSettings({
                    ...gameSettings,
                    foullimit: e.target.value,
                  })
                }
                name="FoulLimit"
                className="h-[6.5vh] w-full rounded-[10px]"
              />
            </div>
          </div>
          {/* Timeouts First Half */}
          <div className="flex h-[6.5vh] flex-row items-center">
            <div className="flex h-full w-[20%] flex-row items-center justify-center">
              <label htmlFor="TimeFirstHalf" className="font-bold text-white">
                Timeouts First Half:
              </label>
            </div>
            <div className="flex h-full w-[80%] flex-row items-center p-[2%]">
              <input
                type="number"
                min={1}
                max={3}
                name="TimeFirstHalf"
                className="h-[6.5vh] w-full rounded-[10px]"
                value={gameSettings.timeoutsfirsthalf}
                onChange={(e) =>
                  setGamesSettings({
                    ...gameSettings,
                    timeoutsfirsthalf: e.target.value,
                  })
                }
              />
            </div>
          </div>
          {/* Timeouts Second Half */}
          <div className="flex h-[6.5vh] flex-row items-center">
            <div className="flex h-full w-[20%] flex-row items-center justify-center">
              <label htmlFor="TimeSecondHalf" className="font-bold text-white">
                Timeouts Second Half:
              </label>
            </div>
            <div className="flex h-full w-[80%] flex-row items-center p-[2%]">
              <input
                type="number"
                min={1}
                max={4}
                name="TimeSecondHalf"
                className="h-[6.5vh] w-full rounded-[10px]"
                value={gameSettings.timeoutssecondhalf}
                onChange={(e) =>
                  setGamesSettings({
                    ...gameSettings,
                    timeoutssecondhalf: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>
        <div className="flex h-[10%] w-[100%] flex-row items-end justify-between pl-[22%] pr-[2%]">
          <div className="h-[8vh]">
            <button
              className="h-full w-[18vw] rounded-[10px] bg-yellow-500 text-[24px] font-bold text-white"
              type="submit"
            >
              Submit
            </button>
          </div>
          <div className="h-[8vh]">
            <button
              className="h-full w-[18vw] rounded-[10px] bg-red-500 text-[24px] font-bold text-white"
              type="button"
              onClick={() => {
                setSelectGameSettings(false);
                setIsTeam2Selection(true);
              }}
            >
              Back
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default GameSettings;
