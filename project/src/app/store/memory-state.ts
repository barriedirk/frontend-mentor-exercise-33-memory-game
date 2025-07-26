import { InjectionToken } from '@angular/core';
import { Game, Memory, Settings } from '@interfaces/memory';
import { initialData } from './initial-data';

function isValidSettingsObject(obj: any): obj is Memory {
  if (typeof obj !== 'object' || obj === null) return false;

  return (
    typeof obj.settings?.theme === 'string' &&
    typeof obj.settings?.player === 'number' &&
    typeof obj.settings?.grid === 'string'
  );
}

export type ValueType = Settings | Game;
export type StorageType = 'settings' | 'game';

export const updateStorage = async (name: StorageType, value: Settings | Game) => {
  localStorage.setItem(name, JSON.stringify(value));
};

export const MEMORY_STATE = new InjectionToken<Memory>('Memory', {
  factory: () => {
    let memory: Memory = initialData;

    try {
      const settingsRaw = localStorage.getItem('settings');
      const gameRaw = localStorage.getItem('game');

      if (!settingsRaw || !gameRaw) throw new Error('Missing data');

      const settings = JSON.parse(settingsRaw) as Settings;
      const game = JSON.parse(gameRaw) as Game;

      const isValid = isValidSettingsObject(settings);

      if (!isValid || typeof game !== 'object') throw new Error('Invalid format');

      memory = { settings, game };
    } catch (e) {
      console.warn('Error loading memory from localStorage. Resetting.', e);

      localStorage.setItem('settings', JSON.stringify(initialData.settings));
      localStorage.setItem('game', JSON.stringify(initialData.game));
    }

    return memory;
  },
});
