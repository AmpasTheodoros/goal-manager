// types/team.ts

export interface Player {
  id: number;
  name: string;
  role: string;  // Changed from 'position' to 'role'
  skill: number;
}

export interface Team {
  name: string;
  players: Player[];
}