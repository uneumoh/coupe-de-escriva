import { FieldValue } from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";

export interface Player {
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

export interface GameSettingsType {
  gametype: string;
  foullimit: string;
  timeoutsfirsthalf: string;
  timeoutssecondhalf: string;
}

export interface Props {
  team1: string;
  team2: string;
  onFieldTeam1: Player[];
  onFieldTeam2: Player[];
  team1Players: Player[];
  team2Players: Player[];
  gameSettings: GameSettingsType;
  setOnfieldTeam1: Dispatch<SetStateAction<Player[]>>;
  setOnfieldTeam2: Dispatch<SetStateAction<Player[]>>;
}

export interface MatchEvents {
  Actor: string;
  Event: string;
  timestamp: FieldValue;
}

export interface PlayerStatsType {
  username: string;
  points: number;
  assists: number;
  rebounds: number;
  steals: number;
  blocks: number;
  fouls: number;
}
