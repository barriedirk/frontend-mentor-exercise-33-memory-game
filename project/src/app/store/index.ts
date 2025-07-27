import { computed, inject } from '@angular/core';
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';

import { MEMORY_STATE, updateStorage, StorageType } from './memory-state';
import { initialData } from './initial-data';

import { Settings, Game, Player, StatusEnum } from '@interfaces/memory';
import { clearGame, initGame } from './functions';

function syncState<T>(key: StorageType, store: any, value: Settings | Game) {
  updateStorage(key, value);
  patchState(store, { [key]: value });
}

export const GlobalStore = signalStore(
  { providedIn: 'root' },
  withState(() => inject(MEMORY_STATE)),
  withMethods((store) => ({
    settings: computed<Settings>(() => store.settings()),
    game: computed<Game>(() => store.game()),
    clearMemory() {
      const { settings, game } = initialData;

      syncState('settings', store, settings);
      syncState('game', store, game);
    },
    updateSettings(settings: Settings) {
      syncState('settings', store, settings);
    },
    clearGamer() {
      const game = clearGame();

      syncState('game', store, game);
    },
    initGame() {
      const game = initGame(store.settings());

      syncState('game', store, game);
    },

    updatePlayerTime(index: number, time: number) {
      const game = store.game();
      const { players } = game;

      players[index - 1] = {
        ...players[index - 1],
        time,
      };

      syncState('game', store, { ...game, players });
    },
    updateStatusGame(status: StatusEnum) {
      const game = store.game();

      syncState('game', store, { ...game, status });
    },
    updateCurrentMovesGame() {
      const game = store.game();

      if (game.currentPlayer === 0 || game.currentPlayer - 1 > game.players.length) return;

      game.players[game.currentPlayer - 1].moves;

      syncState('game', store, game);
    },
    updateCurrentPairSuccessfulGame() {
      const game = store.game();

      if (game.currentPlayer === 0 || game.currentPlayer - 1 > game.players.length) return;

      game.players[game.currentPlayer - 1].pairSuccessful += 1;

      syncState('game', store, game);
    },

    getCurrentPlayer: computed<Player | undefined>(() => {
      const game = store.game();

      if (game.currentPlayer === 0 || game.currentPlayer - 1 > game.players.length) return undefined;

      return game.players[game.currentPlayer - 1];
    }),
    getStatusGame: computed<StatusEnum>(() => {
      return store.game().status;
    }),
    getCurrentMovesGame: computed<StatusEnum>(() => {
      const game = store.game();

      if (game.currentPlayer === 0 || game.currentPlayer - 1 > game.players.length) return 0;

      return game.players[game.currentPlayer - 1].moves;
    }),
  })),
);
