import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { Button } from '@components/button/button';
import { RadioInput } from '@components/radio-group/radio-group';

@Component({
  selector: 'app-main',
  imports: [ReactiveFormsModule, RadioInput, Button],
  templateUrl: './main.html',
  styleUrl: './main.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPage {
  themeOptions = ['Numbers', 'Inputs'];
  playersOptions = ['1', '2', '3', '4'];
  gridOptions = ['4x4', '6x6'];

  themeControl = new FormControl('');
  playerControl = new FormControl('');
  gridControl = new FormControl('');

  memoryForm = new FormGroup({
    theme: this.themeControl,
    player: this.playerControl,
    grid: this.gridControl,
  });

  startGame() {
    // @todo start game
  }
}
