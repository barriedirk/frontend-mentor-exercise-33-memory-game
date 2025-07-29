import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Icon } from '@components/icon/icon';

@Component({
  selector: 'app-flip-card',
  imports: [NgClass, Icon],
  templateUrl: './flip-card.html',
  styleUrl: './flip-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlipCard {
  @Input() value!: number;
  @Input() idx!: number;
  @Input() useIcons!: boolean;
  @Input() temporalSelected: boolean = false;
  @Input() selected: boolean = false;
  @Input() iconId: number = 1;

  @Output() selectedCard = new EventEmitter<void>();

  cardClasses: string[] = [`size--small`];
  private _size: 'small' | 'normal' = 'small';

  @Input()
  set size(value: 'small' | 'normal') {
    if (value !== this._size) {
      this._size = value;
      this.cardClasses = [`size--${value}`];
    }
  }
  get size() {
    return this._size;
  }

  click() {
    !this.temporalSelected && !this.selected && this.selectedCard.emit();
  }
}
