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
}

export interface Player {
  index: number;
  moves: number;
  time: number;
  win: number;
}

export interface Pair {
  pair1: number;
  pair2: number;
}
