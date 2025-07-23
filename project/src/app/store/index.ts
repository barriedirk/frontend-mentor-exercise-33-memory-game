import { computed, inject } from '@angular/core';
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { Memory } from '@interfaces/memory';
import { MEMORY_STATE, updateStorage } from './memory-state';
import { initialData } from './initial-data';

export const GlobalStore = signalStore(
  { providedIn: 'root' },
  withState(() => inject(MEMORY_STATE)),
  withMethods((store) => ({
    clearCart() {
      const memory = initialData;

      updateStorage(memory);
      patchState(store, memory);
    },
    update(memory: Memory) {
      patchState(store, memory);
    },
    game: computed<Memory>(() => {
      return {
        theme: store.theme(),
        player: store.player(),
        grid: store.grid(),
      };
    }),
  })),
);
