import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Button {
  @Input() text!: string;
  @Input() disabled: boolean = false;

  @Output() onClick = new EventEmitter<void>();

  click() {
    this.onClick.emit();
  }
}
