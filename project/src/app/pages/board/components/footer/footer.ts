import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';

import { CardInformation } from '@components/card-information/card-information';
import { Player } from '@interfaces/player';
import { GlobalStore } from '@store';

@Component({
  selector: 'app-footer',
  imports: [CardInformation],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer implements OnInit {
  store = inject(GlobalStore);
  nPlayers: number = 0;
  players: Player[] = [];

  get range(): number[] {
    return Array.from({ length: this.nPlayers }, (_, i) => i);
  }

  ngOnInit() {
    const settings = this.store.settings();
    const players: Player[] = [];

    this.nPlayers = +settings.players || 1;

    for (let i = 0; i < this.nPlayers; i++) {
      players.push({
        id: i + 1,
        time: 0,
        moves: 0,
      });
    }
    this.players = players;
  }
}
