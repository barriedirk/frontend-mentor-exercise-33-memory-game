import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { Button } from '@components/button/button';
import { RadioInput } from '@components/radio-group/radio-group';

import { GlobalStore } from '@store';
import { ActivatedRoute, Router } from '@angular/router';
import { Memory } from '@interfaces/memory';

@Component({
  selector: 'app-main',
  imports: [ReactiveFormsModule, RadioInput, Button],
  templateUrl: './main.html',
  styleUrl: './main.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPage {
  private memoryStore = inject(GlobalStore);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  themeOptions = ['Numbers', 'Inputs'];
  playersOptions = ['1', '2', '3', '4'];
  gridOptions = ['4x4', '6x6'];

  themeControl = new FormControl(this.themeOptions[0]);
  playerControl = new FormControl(this.playersOptions[0]);
  gridControl = new FormControl(this.gridOptions[0]);

  memoryForm = new FormGroup({
    theme: this.themeControl,
    player: this.playerControl,
    grid: this.gridControl,
  });

  startGame() {
    const memory = this.memoryForm.value as Memory;

    this.memoryStore.update(memory);

    this.router.navigate(['/board']);
  }
}
