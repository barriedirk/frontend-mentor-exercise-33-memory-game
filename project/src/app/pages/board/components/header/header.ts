import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { StatusEnum } from '@interfaces/memory';

import { Button } from '@components/button/button';
import { GlobalStore } from '@store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [Button],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  private router = inject(Router);
  private store = inject(GlobalStore);

  restart() {
    this.store.updateStatusGame(StatusEnum.Restart);
  }

  newGame() {
    this.router.navigate(['/']);
  }
}
