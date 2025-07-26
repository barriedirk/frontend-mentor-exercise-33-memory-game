import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';

import { CardInformation } from '@components/card-information/card-information';
import { Player } from '@interfaces/memory';
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
  timeFormat = signal<string>('0:00');
  moves = signal<number>(0);

  get range(): number[] {
    return Array.from({ length: this.nPlayers }, (_, i) => i);
  }

  ngOnInit() {
    const settings = this.store.settings();
    const games = this.store.game();

    this.nPlayers = +settings.players || 1;
    this.players = games.players;

    const player = this.store.getCurrentPlayer();

    if (player) {
      this.currentPlayer.set(games.currentPlayer);
      this.time.set(player.time);
      this.moves.set(player.moves);

      this.initInterval();
    }
  }

  initInterval() {
    this.intervalId = setInterval(() => this.updateTime(), 1000);

    console.log(this.intervalId);
  }

  updateTime() {
    this.time.update((n) => n + 1);

    this.timeFormat.set(this.timeFormatPipe.transform(this.time()));

    console.log(this.timeFormat());

    this.store.updatePlayerTime(this.currentPlayer(), this.time());
  }

  clearInterval() {
    clearInterval(this.intervalId);
  }

  ngOnDestroy() {
    this.clearInterval();
  }
}
