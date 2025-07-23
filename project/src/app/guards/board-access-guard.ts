import { inject } from '@angular/core';

import { CanActivateFn, Router } from '@angular/router';
import { GlobalStore } from '@store';

export const boardAccessGuard: CanActivateFn = () => {
  const router = inject(Router);
  const globalStore = inject(GlobalStore);

  const game = globalStore.game();

  const isValid = game.theme !== '' && game.player !== null && game.grid !== null;

  if (isValid) return true;

  router.navigate(['/']);

  return false;
};
