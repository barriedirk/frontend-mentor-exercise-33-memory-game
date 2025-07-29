import { Game, Player, Settings, StatusEnum } from '@interfaces/memory';

export function clearGame(): Game {
  return {
    players: [],
    currentPlayer: 0,
    status: StatusEnum.NewGame,
    currentPair: {
      p0: -1,
      p1: -1,
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
      pairSuccessful: 0,
    });
  }

  return {
    ...game,
    currentPlayer: 0,
    players,
  };
}
