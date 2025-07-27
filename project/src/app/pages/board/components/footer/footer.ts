import { ChangeDetectionStrategy, Component, effect, inject, OnDestroy, OnInit, signal } from '@angular/core';

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
  store = inject(GlobalStore);
  timeFormatPipe = new TimeFormatPipe();
  nPlayers: number = 0;
  players: Player[] = [];

  intervalId: ReturnType<typeof setInterval> = 0;

  currentPlayer = signal<number>(0);
  time = signal<number>(0);
  moves = signal<number>(0);

  get range(): number[] {
    return Array.from({ length: this.nPlayers }, (_, i) => i);
  }

  constructor() {
    let previousStatus: StatusEnum | null = null;
    let previousMoves: number | null = null;

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

      console.log('update Status Enum ');

      switch (status) {
        case StatusEnum.ChangePlayer:
        case StatusEnum.Start:
          this.initializePlayer();
          this.initInterval();

          break;
        case StatusEnum.Stop:
          this.clearInterval();

          break;
        case StatusEnum.Continue:
          this.initInterval();

          break;
        case StatusEnum.Restart:
          this.time.set(0);
          this.moves.set(0);
          this.initInterval();

          previousStatus = StatusEnum.Start;
          this.store.updateStatusGame(StatusEnum.Start);

          break;
      }
    });
  }

  initializePlayer() {
    const games = this.store.game();
    const player = this.store.getCurrentPlayer();

    if (player) {
      this.currentPlayer.set(games.currentPlayer);
      this.time.set(player.time);
      this.moves.set(player.moves);
    }
  }

  ngOnInit() {
    const settings = this.store.settings();
    const games = this.store.game();

    this.nPlayers = +settings.players || 1;
    this.players = games.players;

    const player = this.store.getCurrentPlayer();
  }

  initInterval() {
    this.clearInterval();

    this.intervalId = setInterval(() => this.updateTime(), 1000);
  }

  updateTime() {
    this.time.update((n) => n + 1);

    this.store.updatePlayerTime(this.currentPlayer(), this.time());
  }

  clearInterval() {
    clearInterval(this.intervalId);
  }

  ngOnDestroy() {
    this.clearInterval();
  }
}
