import React, { Dispatch, SetStateAction } from "react";
import StatButton from "./StatButton";
import { Player, PlayerStatsType } from "@/app/types/match";

interface Props {
  player: Player | null;
  stats: PlayerStatsType | null;
  setPlayerSelected: Dispatch<SetStateAction<boolean>>;
  setSelectedPlayerStats: Dispatch<SetStateAction<PlayerStatsType | null>>;
  setSelectedPlayer: Dispatch<SetStateAction<Player | null>>;
  updateStats: (
    player: Player,
    stat: keyof PlayerStatsType,
    number?: number,
  ) => void;
}

const MatchOverlay = ({
  player,
  stats,
  setPlayerSelected,
  setSelectedPlayer,
  setSelectedPlayerStats,
  updateStats,
}: Props) => {
  const closeOverlay = () => {
    setPlayerSelected(false);
    setSelectedPlayer(null);
    setSelectedPlayerStats(null);
  };

  return (
    <div className="absolute left-0 top-0 z-50 h-full w-full bg-black bg-opacity-50">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
        <div className="h-[75vh] w-[75vw] rounded-lg bg-white">
          <div className="flex justify-end px-[10%]">
            <button
              className="text-2xl font-bold"
              onClick={() => {
                closeOverlay();
              }}
            >
              X
            </button>
          </div>
          <div>
            <p className="text-[36px] font-bold">
              {player?.firstname} {player?.lastname[0]}.
            </p>
          </div>
          {stats && (
            <div className="flex flex-row items-center justify-evenly">
              <div className="flex flex-col items-center">
                <p>PTS</p> <p>{stats.points}</p>
              </div>
              <div className="flex flex-col items-center">
                <p>AST</p> <p>{stats.assists}</p>
              </div>
              <div className="flex flex-col items-center">
                <p>REB</p> <p>{stats.rebounds}</p>
              </div>
              <div className="flex flex-col items-center">
                <p>STL</p> <p>{stats.steals}</p>
              </div>
              <div className="flex flex-col items-center">
                <p>BLK</p> <p>{stats.blocks}</p>
              </div>
            </div>
          )}

          <div className="mt-[5%] flex h-[5%] w-full flex-row justify-around font-bold">
            <StatButton
              onClick={() => {
                if (player) {
                  updateStats(player, "points");
                  closeOverlay();
                }
              }}
            >
              +1
            </StatButton>
            <StatButton
              onClick={() => {
                if (player) {
                  updateStats(player, "points", 2);
                  closeOverlay();
                }
              }}
            >
              +2
            </StatButton>
            <StatButton
              onClick={() => {
                if (player) {
                  updateStats(player, "points", 3);
                  closeOverlay();
                }
              }}
            >
              +3
            </StatButton>
            <StatButton
              onClick={() => {
                if (player) {
                  updateStats(player, "assists");
                  closeOverlay();
                }
              }}
            >
              +ast
            </StatButton>
          </div>
          <div className="mt-[5%] flex h-[5%] w-full flex-row justify-around font-bold">
            <StatButton
              onClick={() => {
                if (player) {
                  updateStats(player, "rebounds");
                  closeOverlay();
                }
              }}
            >
              +reb
            </StatButton>
            <StatButton
              onClick={() => {
                if (player) {
                  updateStats(player, "steals");
                  closeOverlay();
                }
              }}
            >
              +stl
            </StatButton>
            <StatButton
              onClick={() => {
                if (player) {
                  updateStats(player, "blocks");
                  closeOverlay();
                }
              }}
            >
              +blk
            </StatButton>
            <StatButton
              onClick={() => {
                if (player) {
                  updateStats(player, "fouls");
                  closeOverlay();
                }
              }}
            >
              +fls
            </StatButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchOverlay;
