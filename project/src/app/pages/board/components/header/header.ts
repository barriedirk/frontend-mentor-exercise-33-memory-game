import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Button } from '@components/button/button';

@Component({
  selector: 'app-header',
  imports: [Button],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  restart() {}

  newGame() {}
}
