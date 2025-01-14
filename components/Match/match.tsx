"use client";
import Header from "@/components/header";
import React, { useState } from "react";
import PlayerIcon from "@/components/Match/PlayerIcon";
import ControlBar from "./ControlBar";
import EventTable from "./EventTable";

interface GameSettingsType {
  gametype: string;
  foullimit: string;
  timeoutsfirsthalf: string;
  timeoutssecondhalf: string;
}

interface Props {
  team1: string;
  team2: string;
  onFieldTeam1: string[];
  onFieldTeam2: string[];
  team1Players: string[];
  team2Players: string[];
  gameSettings: GameSettingsType;
}
interface MatchEvents {
  Actor: "";
  Event: "";
}

const Match = ({
  team1,
  team2,
  onFieldTeam1,
  onFieldTeam2,
  team1Players,
  team2Players,
  gameSettings,
}: Props) => {
  const [player, setPlayer] = useState({
    firsttname: "",
    username: "",
    position: "",
    points: 0,
    assists: 0,
    rebounds: 0,
    steals: 0,
    blocks: 0,
    fouls: 0,
  });
  const [matchEvents, setMatchEvents] = useState<MatchEvents[]>([]);
  const handleUndo = () => {};
  const [selectedPlayer, setSelectedPlayer] = useState("");

  return (
    <div className="flex h-[85vh] flex-col">
      <div className="flex w-full flex-row">
        <div className="TeamSelection mx-[3vw] mt-[2vh] h-[50vh] w-1/2 text-white">
          <div className="flex h-full w-full flex-col">
            <div className="flex flex-1 flex-row">
              <div className="flex w-[50%] flex-row items-center justify-evenly">
                <PlayerIcon>{onFieldTeam1[3]}</PlayerIcon>

                <PlayerIcon>{onFieldTeam1[1]}</PlayerIcon>
              </div>
              <div className="flex w-[50%] flex-row items-center justify-evenly">
                <PlayerIcon>{onFieldTeam2[2]}</PlayerIcon>
                <PlayerIcon>{onFieldTeam2[3]}</PlayerIcon>
              </div>
            </div>
            <div className="flex flex-1 flex-row">
              <div className="flex w-[50%] flex-row items-center justify-end pr-[10vw]">
                <PlayerIcon>{onFieldTeam1[0]}</PlayerIcon>
              </div>
              <div className="flex w-[50%] flex-row items-center justify-start pl-[10vw]">
                <PlayerIcon>{onFieldTeam2[0]}</PlayerIcon>
              </div>
            </div>
            <div className="flex flex-1 flex-row">
              <div className="flex w-[50%] flex-row items-center justify-evenly">
                <PlayerIcon>{onFieldTeam1[4]}</PlayerIcon>
                <PlayerIcon>{onFieldTeam1[2]}</PlayerIcon>
              </div>
              <div className="flex w-[50%] flex-row items-center justify-evenly">
                <PlayerIcon>{onFieldTeam2[1]}</PlayerIcon>
                <PlayerIcon>{onFieldTeam2[4]}</PlayerIcon>
              </div>
            </div>
          </div>
        </div>
        <EventTable team1={team1} team2={team2} />
      </div>
      {/* Control Bar */}
      <ControlBar firstname={player.firsttname} />
    </div>
  );
};

export default Match;
