import { computed, inject } from '@angular/core';
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';

import { MEMORY_STATE, updateStorage } from './memory-state';
import { initialData } from './initial-data';

import { Memory, Settings } from '@interfaces/memory';

export const GlobalStore = signalStore(
  { providedIn: 'root' },
  withState(() => inject(MEMORY_STATE)),
  withMethods((store) => ({
    clearMemory() {
      const memory = initialData;

      updateStorage(memory);
      patchState(store, memory);
    },
    updatSettinge(settings: Settings) {
      patchState(store, { ...store, settings });
    },
    settings: computed<Settings>(() => {
      return store.settings();
    }),
  })),
);
