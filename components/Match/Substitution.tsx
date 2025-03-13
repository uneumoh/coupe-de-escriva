import { Player } from "@/app/types/match";
import React, { Dispatch, SetStateAction } from "react";

interface Props {
  teamPlayers: Player[];
  setSubOverlay: Dispatch<SetStateAction<boolean>>;
  selectedPlayer: Player | null;
  setMatchOverlay: Dispatch<SetStateAction<boolean>>;
  setTeamPlayers: Dispatch<SetStateAction<Player[]>>;
}
const Substitution = ({
  teamPlayers,
  setTeamPlayers,
  setSubOverlay,
  selectedPlayer,
  setMatchOverlay,
}: Props) => {
  return (
    <div className="z-10 h-full w-full">
      <div className="flex-end flex flex-row">
        <button onClick={() => setSubOverlay(false)}>close</button>
      </div>
      {teamPlayers.map((player) => {
        return (
          <button
            key={player.username}
            onClick={() => {
              if (!selectedPlayer) return;

              setTeamPlayers((prevPlayers) => {
                return prevPlayers.map((p) =>
                  p.username === selectedPlayer.username ? player : p,
                );
              });

              setSubOverlay(false);
              setMatchOverlay(false);
            }}
          >
            {player.firstname} {player.lastname[0]}.
          </button>
        );
      })}
    </div>
  );
};

export default Substitution;
