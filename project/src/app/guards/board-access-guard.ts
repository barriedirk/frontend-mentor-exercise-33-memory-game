import { inject } from '@angular/core';

import { CanActivateFn, Router } from '@angular/router';
import { GlobalStore } from '@store';

export const boardAccessGuard: CanActivateFn = () => {
  const router = inject(Router);
  const store = inject(GlobalStore);

  const game = store.settings();

  const isValid = game.theme !== '' && game.players !== null && game.grid !== null;

  if (isValid) return true;

  router.navigate(['/']);

  return false;
};
