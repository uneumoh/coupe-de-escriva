"use client";

import React, { useEffect, useState } from "react";

import Match from "@/components/Match/match";
import Header from "@/components/header";
import GameSettings from "@/components/NewGame/gamesettings";
import Team2Selection from "@/components/NewGame/team2selection";
import Team1Selection from "@/components/NewGame/team1selection";
import NewGameForm from "@/components/NewGame/NewGameForm";
import Container from "@/components/Container";

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

interface GameSettingsType {
  gametype: string;
  foullimit: string;
  timeoutsfirsthalf: string;
  timeoutssecondhalf: string;
}

const NewGame = () => {
  const [points, setPoints] = useState(0);
  const [assists, setAssists] = useState(0);
  const [rebounds, setRebounds] = useState(0);
  const [blocks, setBlocks] = useState(0);
  const [steals, setSteals] = useState(0);
  const [played, setPlayed] = useState(false);

  const [selectGameSettings, setSelectGameSettings] = useState(false);
  const [startMatch, setStartMatch] = useState(false);
  const [startSelection, setStartSelection] = useState(false);

  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");

  const [isTeamsSelected, setIsTeamsSelected] = useState(false);
  const [isTeam1Selection, setIsTeam1Selection] = useState(false);
  const [isTeam2Selection, setIsTeam2Selection] = useState(false);

  // array of all players in the team for starting selection
  const [team1players, setTeam1Players] = useState<Player[]>([]);
  const [team2players, setTeam2Players] = useState<Player[]>([]);
  const [onFieldTeam1, setOnfieldTeam1] = useState<Player[]>([]);
  const [onFieldTeam2, setOnfieldTeam2] = useState<Player[]>([]);

  //Game Settings useState
  const [gameSettings, setGameSettings] = useState<GameSettingsType>({
    gametype: "",
    foullimit: "",
    timeoutsfirsthalf: "",
    timeoutssecondhalf: "",
  });

  // Log updated players state values after they change
  useEffect(() => {
    console.log("Updated Team 1 Players:", team1players);
  }, [team1players]);

  useEffect(() => {
    console.log("Updated Team 2 Players:", team2players);
  }, [team2players]);

  return (
    <div className="flex h-screen w-screen flex-col">
      <Header />
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {!isTeamsSelected && (
          <NewGameForm
            setIsTeam1Selection={setIsTeam1Selection}
            team1={team1}
            team2={team2}
            setTeam1={setTeam1}
            setTeam2={setTeam2}
            setTeam1Players={setTeam1Players}
            setTeam2Players={setTeam2Players}
            setIsTeamsSelected={setIsTeamsSelected}
          />
        )}
        {/* Team 1 Selection */}
        {isTeam1Selection && (
          <Team1Selection
            team1={team1}
            team1players={team1players}
            setIsTeam1Selection={setIsTeam1Selection}
            setIsTeam2Selection={setIsTeam2Selection}
            setIsTeamsSelected={setIsTeamsSelected}
            onFieldTeam1={onFieldTeam1}
            setOnfieldTeam1={setOnfieldTeam1}
          />
        )}
        {isTeam2Selection && (
          <Team2Selection
            team2={team2}
            team2players={team2players}
            onFieldTeam2={onFieldTeam2}
            setOnfieldTeam2={setOnfieldTeam2}
            setIsTeam1Selection={setIsTeam1Selection}
            setIsTeam2Selection={setIsTeam2Selection}
            setSelectGameSettings={setSelectGameSettings}
          />
        )}

        {selectGameSettings && (
          <GameSettings
            setSelectGameSettings={setSelectGameSettings}
            setIsTeam2Selection={setIsTeam2Selection}
            setStartMatch={setStartMatch}
            gameSettings={gameSettings}
            setGamesSettings={setGameSettings}
          />
        )}
        {startMatch && (
          <Match
            team1={team1}
            team2={team2}
            team1Players={team1players}
            team2Players={team2players}
            onFieldTeam1={onFieldTeam1}
            onFieldTeam2={onFieldTeam2}
            gameSettings={gameSettings}
          />
        )}
      </Container>
    </div>
  );
};

export default NewGame;
