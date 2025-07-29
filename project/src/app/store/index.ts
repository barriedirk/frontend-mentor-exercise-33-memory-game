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

    updateCurrentPlayerTime(time: number) {
      const game = store.game();
      const { players, currentPlayer } = game;
      let player = players[currentPlayer];

      player = {
        ...player,
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

      players[currentPlayer].moves++;

      syncState('game', store, { ...game, players });
    },
    updateCurrentPairSuccessfulGame() {
      const game = store.game();
      const { players, currentPlayer } = game;

      players[currentPlayer].pairSuccessful += 1;

      syncState('game', store, { ...game, players });
    },
    moveNextPlayer() {
      const game = store.game();
      const { players, currentPlayer: index } = game;

      const currentPlayer = (index + 1) % players.length;

      console.log('moveNextPlayer', { index, currentPlayer, players });

      syncState('game', store, { ...game, currentPlayer });
    },
    settingsSignal: computed(() => store.settings()),
    gameSignal: computed(() => store.game()),
    getCurrentPlayer: computed<Player | undefined>(() => {
      const game = store.game();
      const { players, currentPlayer } = game;

      console.log('getCurrentPlayer', { players, currentPlayer });

      return players[currentPlayer];
    }),
    getIndexPlayer: computed<number>(() => {
      return store.game().currentPlayer;
    }),
    getStatusGame: computed<StatusEnum>(() => {
      return store.game().status;
    }),
    getCurrentMovesGame: computed<StatusEnum>(() => {
      const game = store.game();
      const { players, currentPlayer } = game;

      console.log('getCurrentMovesGame', { players, currentPlayer });

      return players[currentPlayer].moves;
    }),
  })),
);
