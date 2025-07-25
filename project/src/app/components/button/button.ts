import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [NgClass],
  templateUrl: './button.html',
  styleUrl: './button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Button {
  @Input() text!: string;
  @Input() disabled: boolean = false;

  buttonClasses: string[] = [`button--orange`];
  private _theme: 'orange' | 'blue' = 'orange';

  @Input()
  set theme(value: 'orange' | 'blue') {
    if (value !== this._theme) {
      this._theme = value;
      this.buttonClasses = [`button--${this._theme}`];
    }
  }
  get theme(): 'orange' | 'blue' {
    return this._theme;
  }

  @Output() onClick = new EventEmitter<void>();

  @HostBinding('class')
  get hostClasses(): string {
    return `button button--${this.theme}`;
  }

  click() {
    this.onClick.emit();
  }
}
