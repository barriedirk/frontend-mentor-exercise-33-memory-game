import { computed, inject } from '@angular/core';
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';

import { MEMORY_STATE, updateStorage, StorageType } from './memory-state';
import { initialData } from './initial-data';

import { Settings, Game, Player, StatusEnum } from '@interfaces/memory';
import { clearGame, initGame } from './functions';

function syncState<T>(key: StorageType, store: any, value: Settings | Game) {
  patchState(store, { [key]: value });
  updateStorage(key, value);
}

export const GlobalStore = signalStore(
  { providedIn: 'root' },
  withState(() => inject(MEMORY_STATE)),
  withMethods((store) => ({
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
      const { players, currentPlayer } = game;

      players[currentPlayer - 1].moves++;

      syncState('game', store, { ...game, players });
    },
    updateCurrentPairSuccessfulGame() {
      const game = store.game();
      const { players, currentPlayer: index } = game;

      if (index === 0 || index - 1 > players.length) return;

      players[index - 1].pairSuccessful += 1;

      syncState('game', store, { ...game, players });
    },
    moveNextPlayer() {
      const game = store.game();
      const { players, currentPlayer: index } = game;

      console.log('moveNextPlayer 1', { index, players });

      const currentPlayer = (index + 1) % (players.length + 1);

      console.log('moveNextPlayer', { index, currentPlayer, players });

      syncState('game', store, { ...game, currentPlayer });
    },
    settingsSignal: computed(() => store.settings()),
    gameSignal: computed(() => store.game()),
    getCurrentPlayer: computed<Player | undefined>(() => {
      const game = store.game();
      const { players, currentPlayer: index } = game;

      if (index === 0 || index - 1 > game.players.length) return undefined;

      return players[index - 1];
    }),
    getIndexPlayer: computed<number>(() => {
      return store.game().currentPlayer;
    }),
    getStatusGame: computed<StatusEnum>(() => {
      return store.game().status;
    }),
    getCurrentMovesGame: computed<StatusEnum>(() => {
      const game = store.game();
      const { players, currentPlayer: index } = game;

      if (index === 0 || index - 1 > game.players.length) return 0;

      return players[index - 1].moves;
    }),
  })),
);
