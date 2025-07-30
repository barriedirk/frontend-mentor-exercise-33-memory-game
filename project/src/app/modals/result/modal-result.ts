import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Button } from '@components/button/button';

import { MODAL_RESULT } from '@app/utils/constants';
import { Player } from '@interfaces/memory';
import { TimeFormatPipe } from '@pipes/time-format-pipe';

@Component({
  selector: 'app-result',
  imports: [Button, TimeFormatPipe],
  templateUrl: './modal-result.html',
  styleUrl: './modal-result.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalResult implements OnInit {
  @Input() players: Player[] = [];

  @Output() close = new EventEmitter<string>();

  ACTIONS = MODAL_RESULT;
  title = 'You did it!';
  information = 'Game over! Here’s how you got on…';
  winners: number[] = [];

  ngOnInit(): void {
    if (this.players.length > 1) {
      this.players.sort((a, b) => b.pairSuccessful - a.pairSuccessful);
      this.winners.push(this.players[0].index);

      const maxPairSuccessful = this.players[0].pairSuccessful;

      for (let i = 1; i < this.players.length; i++) {
        if (maxPairSuccessful === this.players[i].pairSuccessful) {
          this.winners.push(this.players[i].index);
        }
      }

      this.title = this.winners.length === 1 ? `Player ${this.winners[0] + 1} Wins!` : 'It’s a tie!';
    }
  }

  closeModal(action: string) {
    this.close.emit(action);
  }
}
