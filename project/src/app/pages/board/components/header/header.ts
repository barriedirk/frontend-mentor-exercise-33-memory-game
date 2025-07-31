import { ChangeDetectionStrategy, Component, ElementRef, HostListener, inject, signal, ViewChild } from '@angular/core';

import { StatusEnum } from '@interfaces/memory';

import { Button } from '@components/button/button';
import { GlobalStore } from '@store';
import { Router } from '@angular/router';
import { ScreenService } from '@services/screen-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  private screenService = inject(ScreenService);
  isWide = signal(false);

  showMenu = signal<boolean>(false);

  @ViewChild('btnMenu') btnMenu!: ElementRef;
  @ViewChild('btnRestart') btnRestart!: ElementRef;

  constructor() {
    this.screenService.isWide$.pipe(takeUntilDestroyed()).subscribe((value) => {
      if (value && this.showMenu()) {
        this.resumeGame();
      }
    });
  }

  menu() {
    this.store.updateStatusGame(StatusEnum.Stop);
    this.showMenu.set(true);

    setTimeout(() => {
      this.btnRestart?.nativeElement?.focus();
    });
  }

  restart() {
    this.store.clearGame();
    this.store.initGame();
    this.store.updateStatusGame(StatusEnum.Restart);

    this.closeMenu();
  }

  newGame() {
    this.router.navigate(['/']);
  }

  resumeGame() {
    this.store.updateStatusGame(StatusEnum.Start);

    this.showMenu.set(false);
  }

  closeMenu() {
    this.showMenu.set(false);

    setTimeout(() => {
      this.btnMenu?.nativeElement?.focus();
    });
  }
}
