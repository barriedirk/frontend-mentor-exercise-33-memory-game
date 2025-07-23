import { InjectionToken } from '@angular/core';
import { Memory } from '@interfaces/memory';
import { initialData } from './initial-data';

function isValidMemoryItem(obj: any): obj is Memory {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.theme === 'string' &&
    typeof obj.player === 'string' &&
    typeof obj.grid === 'string'
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
        console.error('Error parsing cart from localStorage:', e);

        memory = initialData;
        localStorage.setItem('cart', JSON.stringify(memory));
      }
    }

    return memory;
  },
});
