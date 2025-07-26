import { Memory } from '@interfaces/memory';

import { clearGame } from './functions';

export const initialData: Memory = {
  settings: {
    theme: '',
    players: 0,
    grid: '',
  },
  game: clearGame(),
};
