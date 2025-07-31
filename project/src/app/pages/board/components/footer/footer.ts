import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  effect,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';

import { CardInformation } from '@components/card-information/card-information';
import { Player, StatusEnum } from '@interfaces/memory';
import { TimeFormatPipe } from '@pipes/time-format-pipe';
import { GlobalStore } from '@store';

@Component({
  selector: 'app-footer',
  imports: [CardInformation],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer implements OnInit, OnDestroy {
  private cdr = inject(ChangeDetectorRef);
  private store = inject(GlobalStore);

  timeFormatPipe = new TimeFormatPipe();
  nPlayers: number = 0;
  players = signal<Player[]>([]);

  intervalId: ReturnType<typeof setInterval> = 0;

  currentIndex = signal<number>(0);
  time = signal<number>(0);
  moves = signal<number>(0);
  pairSuccessful = signal<number>(0);

  constructor() {
    let previousStatus: StatusEnum | null = null;
    let previousMoves: number | null = null;
    let previousPairSuccessful: number | null = null;
    let previousIndex: number | null = 0;

    effect(() => {
      const index: number = this.store.getIndexPlayer();

      if (index === previousIndex) return;

      previousIndex = index;

      this.currentIndex.set(index);
    });

    effect(() => {
      const pairSuccessful: number = this.store.getCurrentPairSuccessfulGame();

      if (pairSuccessful === previousPairSuccessful) return;

      previousPairSuccessful = pairSuccessful;

      this.pairSuccessful.set(pairSuccessful);
    });

    effect(() => {
      const moves: number = this.store.getCurrentMovesGame();

      if (moves === previousMoves) return;

      previousMoves = moves;

      this.moves.set(moves);
    });

    effect(() => {
      const status: StatusEnum = this.store.getStatusGame();

      if (status === previousStatus) return;

      previousStatus = status;

      switch (status) {
        case StatusEnum.ChangePlayer:
          this.getLastPlayersInformation();
          this.store.updateStatusGame(StatusEnum.Start);

          break;
        case StatusEnum.Start:
          this.initProperties();
          this.initInterval();

          break;
        case StatusEnum.EndGame:
        case StatusEnum.Stop:
          this.clearInterval();

          break;
        case StatusEnum.Continue:
          this.initInterval();

          break;
        case StatusEnum.Restart:
          this.time.set(0);
          this.moves.set(0);
          this.currentIndex.set(0);

          previousStatus = null;
          previousMoves = null;
          previousIndex = 0;
          this.getLastPlayersInformation();

          this.store.updateStatusGame(StatusEnum.Start);

          break;
      }

      this.cdr.markForCheck();
    });
  }

  ngOnInit() {
    const settings = this.store.settings();

    this.nPlayers = +settings.players || 1;
    this.getLastPlayersInformation();
  }

  initProperties() {
    const games = this.store.game();
    const player = this.store.getCurrentPlayer();

    if (player) {
      this.currentIndex.set(games.currentPlayer);
      this.time.set(player.time);
      this.moves.set(player.moves);
    }
  }

  initInterval() {
    this.clearInterval();

    this.intervalId = setInterval(() => this.updateTime(), 1000);
  }

  getLastPlayersInformation() {
    const games = this.store.game();

    this.players.set(games.players);
  }

  updateTime() {
    this.time.update((n) => n + 1);

    this.store.updateCurrentPlayerTime(this.time());
  }

  clearInterval() {
    clearInterval(this.intervalId);
  }

  ngOnDestroy() {
    this.clearInterval();
  }
}
