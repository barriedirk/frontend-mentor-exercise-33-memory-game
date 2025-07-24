import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-information',
  imports: [NgClass],
  templateUrl: './card-information.html',
  styleUrl: './card-information.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardInformation {
  @Input() title: string = 'Acme';
  @Input() value: string = '0.0';
  @Input() selected: boolean = false;
  @Input() direction: 'row' | 'column' = 'column';

  labelledby: string = 'card-information' + Math.random().toString(36).substring(2, 10);
}
