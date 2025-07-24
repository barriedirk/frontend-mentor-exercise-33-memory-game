import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  imports: [],
  templateUrl: './icon.html',
  styleUrl: './icon.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Icon {
  @Input() iconId: number = 1;

  private readonly iconMap: Record<number, string> = {
    1: 'assets/icons/anchor.svg',
    2: 'assets/icons/bug.svg',
    3: 'assets/icons/car.svg',
    4: 'assets/icons/flask.svg',
    5: 'assets/icons/futbol.svg',
    6: 'assets/icons/hand-spock.svg',
    7: 'assets/icons/lira-sign.svg',
    8: 'assets/icons/moon.svg',
    9: 'assets/icons/snowflake.svg',
    10: 'assets/icons/sun.svg',
  };

  get iconPath(): string {
    return this.iconMap[this.iconId] ?? 'assets/icons/default.svg';
  }
}
