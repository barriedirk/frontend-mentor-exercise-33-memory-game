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
  @Input() theme: 'orange' | 'blue' = 'orange';
  @Input() disabled: boolean = false;

  @Output() onClick = new EventEmitter<void>();

  @HostBinding('class')
  get hostClasses(): string {
    return `button button--${this.theme}`;
  }

  get buttonClasses(): string[] {
    return [`button--${this.theme}`];
  }

  click() {
    this.onClick.emit();
  }
}
