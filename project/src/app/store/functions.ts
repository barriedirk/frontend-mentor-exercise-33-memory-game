import { Game, Player, Settings } from '@interfaces/memory';

export function clearGame(): Game {
  return {
    players: [],
    currentPlayer: 0,
    currentPair: {
      pair1: -1,
      pair2: -1,
    },
  };
}

export function initGame(settings: Settings): Game {
  const game = clearGame();
  const players: Player[] = [];

  for (let i = 0; i < settings.players; i++) {
    players.push({
      index: i,
      moves: 0,
      time: 0,
      win: 0,
    });
  }

  return {
    ...game,
    currentPlayer: 1,
    players,
  };
}
