import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-radio-group',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './radio-group.html',
  styleUrl: './radio-group.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioInput implements OnInit {
  @Input() label: string = '';
  @Input() options: string[] = [];
  @Input() control!: FormControl;

  ngOnInit(): void {
    if (!this.control) {
      throw new Error('It is requires a FormControl as input.');
    }
  }
}
