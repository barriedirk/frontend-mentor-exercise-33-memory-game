import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { shuffle } from '@app/utils/functions';
import { FlipCard } from '@components/flip-card/flip-card';
import { Cell } from '@interfaces/cell';
import { GlobalStore } from '@store';

@Component({
  selector: 'app-table',
  imports: [FlipCard, NgClass],
  templateUrl: './table.html',
  styleUrl: './table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Table implements OnInit {
  store = inject(GlobalStore);

  useIcons: boolean = false;
  nCells: number = 0;
  size: 'small' | 'normal' = 'small';
  allPairs: Cell[] = [];
  gridClass: string[] = [];
  gridCardState = [];

  get range(): number[] {
    return Array.from({ length: this.nCells }, (_, i) => i);
  }

  ngOnInit() {
    const settings = this.store.settings();
    const allPairs: Cell[] = [];

    if (settings.grid === '6x6') {
      this.nCells = 6 * 6;
      this.gridClass = ['grid-6x6'];
      this.size = 'small';
    } else {
      this.nCells = 4 * 4;
      this.gridClass = ['grid-4x4'];
      this.size = 'normal';
    }

    for (let i = 0; i < this.nCells; i++) {
      allPairs.push({
        index: i,
        value: (i % 10) + 1,
      });
    }

    this.useIcons = settings.theme == 'Icons';
    this.allPairs = shuffle(allPairs);
  }
}
