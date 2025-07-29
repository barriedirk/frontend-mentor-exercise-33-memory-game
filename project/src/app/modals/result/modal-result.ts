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

  ngOnInit(): void {}

  open() {}

  closeModal(action: string) {
    this.close.emit(action);
  }
}
