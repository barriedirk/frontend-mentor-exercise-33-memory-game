import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { shuffle } from '@app/utils/functions';
import { FlipCard } from '@components/flip-card/flip-card';
import { Cell } from '@interfaces/cell';
import { Pair } from '@interfaces/memory';
import { GlobalStore } from '@store';

@Component({
  selector: 'app-table',
  imports: [FlipCard, NgClass],
  templateUrl: './table.html',
  styleUrl: './table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Table implements OnInit {
  cdr = inject(ChangeDetectorRef);
  store = inject(GlobalStore);

  classCard: string[] = [];

  useIcons: boolean = false;
  nCells: number = 0;
  size: 'small' | 'normal' = 'small';
  gridClass: string[] = [];
  gridCardState = [];
  allPairs: Cell[] = [];
  pair: Pair = {
    p0: -1,
    p1: -1,
  };
  pairIndex = 0;

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
        selected: false,
        temporalSelected: false,
      });
    }

    this.useIcons = settings.theme == 'Icons';
    this.allPairs = shuffle(allPairs);
    this.allPairs.forEach((allPair, idx) => (allPair.index = idx));
  }

  selectedCard(idx: number) {
    console.log({ idx });
    if (this.pairIndex === 1) {
      this.pair.p1 = idx;
      this.allPairs[idx].temporalSelected = true;

      this.checkPairs();
    }

    if (this.pairIndex === 0) {
      this.pairIndex = 1;
      this.pair.p0 = idx;
      this.allPairs[idx].temporalSelected = true;
    }

    this.store.updateCurrentMovesGame();
    this.cdr.markForCheck();
  }

  checkPairs() {
    this.classCard = ['not_allowed'];
    this.cdr.markForCheck();

    setTimeout(() => {
      const { p0, p1 } = this.pair;

      if (this.allPairs[p0].value === this.allPairs[p1].value) {
        const currentPlayer = this.store.game().currentPlayer;

        [p0, p1].forEach((i) => {
          this.allPairs[p0].selected = true;
          this.allPairs[p0].temporalSelected = false;
          this.allPairs[p0].player = currentPlayer;
        });

        this.store.updateCurrentPairSuccessfulGame();
      } else {
        [p0, p1].forEach((i) => {
          this.allPairs[p0].selected = false;
          this.allPairs[p0].temporalSelected = false;
        });
      }

      this.pair = {
        p0: -1,
        p1: -1,
      };

      this.cdr.markForCheck();
    }, 500);
  }
}
