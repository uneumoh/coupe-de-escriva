import { FieldValue } from "firebase/firestore";

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
