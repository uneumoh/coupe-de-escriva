import React, { FormEvent, Dispatch, SetStateAction, useEffect } from "react";
import Container from "../Container";

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
    e.preventDefault();
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
    <Container
      style={{
        backgroundColor: "#0F0051",
        borderRadius: 10,
        padding: 0,
        margin: 0,
        height: "100%",
        width: "100%",
      }}
    >
      <form
        className="flex h-full w-full flex-col"
        onSubmit={(e) => handleGameSettingsSubmit(e)}
      >
        {/* Game Type */}
        <div className="flex h-[75%] flex-col justify-evenly text-[12px]">
          <div className="flex h-[10%] flex-row items-center">
            <div className="flex h-full w-[20%] flex-row items-center justify-center">
              <label htmlFor="GameType" className="font-bold text-white">
                GameType:
              </label>
            </div>
            <div className="flex h-full w-[80%] flex-row items-center p-[2%]">
              <select
                name="GameType"
                className="h-full w-full rounded-[10px]"
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
          <div className="flex h-[10%] flex-row items-center">
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
                className="h-full w-full rounded-[10px]"
              />
            </div>
          </div>
          {/* Timeouts First Half */}
          <div className="flex h-[10%] flex-row items-center">
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
                className="h-full w-full rounded-[10px]"
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
          <div className="flex h-[10%] flex-row items-center">
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
                className="h-full w-full rounded-[10px]"
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
        <div className="flex h-[10%] w-full flex-row items-end justify-evenly">
          <button
            className="h-full w-[40%] rounded-[10px] bg-yellow-500 text-[24px] font-bold text-white"
            type="submit"
          >
            Submit
          </button>
          <button
            className="h-full w-[40%] rounded-[10px] bg-red-500 text-[24px] font-bold text-white"
            type="button"
            onClick={() => {
              setSelectGameSettings(false);
              setIsTeam2Selection(true);
            }}
          >
            Back
          </button>
        </div>
      </form>
    </Container>
  );
};

export default GameSettings;
