import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CardInformation } from '@components/card-information/card-information';

@Component({
  selector: 'app-footer',
  imports: [CardInformation],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {}
