export enum StatusEnum {
  Start = 1,
  Stop = 2,
  Continue = 3,
  NewGame = 4,
  Restart = 5,
  ChangePlayer = 6,
  GameOver = 7,
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
