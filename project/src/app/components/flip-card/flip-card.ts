import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Icon } from '@components/icon/icon';

@Component({
  selector: 'app-flip-card',
  imports: [Icon],
  templateUrl: './flip-card.html',
  styleUrl: './flip-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlipCard {
  @Input() value!: number;
  @Input() useSign!: boolean;

  @Input() iconId: number = 1;
  @Input() backText: string = 'Back side info';
}
