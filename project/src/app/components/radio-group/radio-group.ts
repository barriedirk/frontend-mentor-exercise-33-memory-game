import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
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
  @Input() name?: string;

  labelledby: string = 'labelledby-radio-group-' + Math.random().toString(36).substring(2, 10);

  @ViewChildren('radioItem') radioItems!: QueryList<ElementRef<HTMLElement>>;

  ngOnInit(): void {
    if (!this.control) {
      throw new Error('It is requires a FormControl as input.');
    }

    if (!this.name) {
      this.name = 'radio-group-' + Math.random().toString(36).substring(2, 10);
    }
  }

  selecRadio(option: string) {
    this.control?.setValue(option);
  }

  handleRadioKeydown(event: KeyboardEvent, option: string) {
    const index = this.options.findIndex((v) => v === option);
    const optionsLen = this.options.length;
    let newIndex = index;

    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      newIndex = (index + 1) % optionsLen;
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      newIndex = (index - 1 + optionsLen) % optionsLen;
    } else if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();

      this.selecRadio(option);
      return;
    }

    if (newIndex !== index) {
      event.preventDefault();
      const newValue = this.options[newIndex];

      this.selecRadio(newValue);

      const radioArray = this.radioItems.toArray();
      const target = radioArray[newIndex]?.nativeElement;
      target?.focus();
    }
  }
}
