import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { Button } from '@components/button/button';
import { RadioInput } from '@components/radio-group/radio-group';

import { GlobalStore } from '@store';
import { Router } from '@angular/router';
import { Settings } from '@interfaces/memory';

@Component({
  selector: 'app-main',
  imports: [ReactiveFormsModule, RadioInput, Button],
  templateUrl: './main.html',
  styleUrl: './main.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPage {
  private store = inject(GlobalStore);
  private router = inject(Router);

  themeOptions = ['Numbers', 'Icons'];
  playersOptions = ['1', '2', '3', '4'];
  gridOptions = ['4x4', '6x6'];

  themeControl = new FormControl(this.themeOptions[0]);
  playersControl = new FormControl(this.playersOptions[0]);
  gridControl = new FormControl(this.gridOptions[0]);

  memoryForm = new FormGroup({
    theme: this.themeControl,
    players: this.playersControl,
    grid: this.gridControl,
  });

  startGame() {
    const settingsRaw = this.memoryForm.value as any;
    const settings: Settings = { ...settingsRaw, players: Number(settingsRaw.players) };

    this.store.updateSettings(settings);
    this.store.initGame();

    this.router.navigate(['/board']);
  }
}
