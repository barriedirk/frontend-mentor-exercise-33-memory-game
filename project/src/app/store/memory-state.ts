import { InjectionToken } from '@angular/core';
import { Memory, Settings } from '@interfaces/memory';
import { initialData } from './initial-data';

function isValidMemoryItem(obj: any): obj is Memory {
  if (typeof obj !== 'object' || obj === null) return false;

  return (
    typeof obj.settings?.theme === 'string' &&
    typeof obj.settings?.player === 'number' &&
    typeof obj.settings?.grid === 'string'
  );
}

const localstorageName = 'memory';

export const updateStorage = async (memory: Memory) => {
  localStorage.setItem(localstorageName, JSON.stringify(memory));
};

export const MEMORY_STATE = new InjectionToken<Memory>('Memory', {
  factory: () => {
    const memoryRaw = localStorage.getItem(localstorageName);
    let memory: Memory = initialData;

    if (!memoryRaw) {
      localStorage.setItem(localstorageName, JSON.stringify(initialData));
    } else {
      try {
        const parsed = JSON.parse(memoryRaw);

        const isValid = typeof parsed === 'object' && parsed !== null && Object.values(parsed).every(isValidMemoryItem);

        if (isValid) {
          memory = parsed;
        } else {
          console.warn('Invalid memory data in localStorage. Resetting.');

          localStorage.setItem(localstorageName, JSON.stringify(memory));
        }
      } catch (e) {
        console.error('Error parsing memory from localStorage:', e);

        memory = initialData;
        localStorage.setItem(localstorageName, JSON.stringify(memory));
      }
    }

    return memory;
  },
});
