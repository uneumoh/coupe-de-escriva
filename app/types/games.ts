import { Timestamp } from "firebase/firestore";

export interface Stats {
  points: number;
  assists: number;
  rebounds: number;
  steals: number;
  blocks: number;
}

export interface Events {
  Actor: string;
  Event: string;
  timestamp: Timestamp;
}

export interface GamesType {
  id?: string;
  Date: string;
  Team1: string;
  Team2: string;
  team1Score: number;
  team2Score: number;
  stats?: Stats[];
  events?: Events[];
}

export interface StatsType {
  id?: string;
  points: number;
  assists: number;
  rebounds: number;
  steals: number;
  blocks: number;
}
