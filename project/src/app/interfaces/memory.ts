export enum StatusEnum {
  Start = 1,
  Stop = 2,
  EndGame = 3,
  Continue = 4,
  NewGame = 5,
  Restart = 6,
  ChangePlayer = 7,
  GameOver = 8,
}

export interface Memory {
  settings: Settings;
  game: Game;
}

export interface Settings {
  theme: string;
  players: number;
  grid: string;
}

export interface Game {
  players: Player[];
  currentPlayer: number;
  currentPair: Pair;
  status: StatusEnum;
}

export interface Player {
  index: number;
  moves: number;
  time: number;
  win: number;
  pairSuccessful: number;
}

export interface Pair {
  p0: number;
  p1: number;
}
