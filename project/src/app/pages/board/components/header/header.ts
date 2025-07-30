import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

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
  showMenu = signal<boolean>(false);

  menu() {
    this.store.updateStatusGame(StatusEnum.Stop);
    this.showMenu.set(true);
  }

  restart() {
    this.store.clearGame();
    this.store.initGame();
    this.store.updateStatusGame(StatusEnum.Restart);
  }

  newGame() {
    this.router.navigate(['/']);
  }

  resumeGame() {
    this.store.updateStatusGame(StatusEnum.Start);
    this.showMenu.set(false);
  }
}
