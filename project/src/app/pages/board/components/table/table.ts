import { ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, inject, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';

import { Router } from '@angular/router';

import { ModalResultService } from '@app/modals/result/modal-result-service';

import { MODAL_RESULT } from '@app/utils/constants';
import { shuffle } from '@app/utils/functions';

import { FlipCard } from '@components/flip-card/flip-card';

import { Cell } from '@interfaces/cell';
import { Pair, StatusEnum } from '@interfaces/memory';

import { GlobalStore } from '@store';

@Component({
  selector: 'app-table',
  imports: [FlipCard, NgClass],
  templateUrl: './table.html',
  styleUrl: './table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Table implements OnInit {
  private modalResult = inject(ModalResultService);
  private router = inject(Router);
  private store = inject(GlobalStore);
  private cdr = inject(ChangeDetectorRef);

  classCard: string[] = [];
  nPlayers: number = 0;
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

  constructor() {
    let previousStatus: StatusEnum | null = null;

    effect(() => {
      const status: StatusEnum = this.store.getStatusGame();

      if (status === previousStatus) return;

      previousStatus = status;

      if (previousStatus === StatusEnum.Restart) {
        this.clearSelection();
        this.initGame();
      }
    });
  }

  ngOnInit() {
    const settings = this.store.settings();

    this.nPlayers = this.store.game().players.length;

    if (settings.grid === '6x6') {
      this.nCells = 6 * 6;
      this.gridClass = ['grid-6x6'];
      this.size = 'small';
    } else {
      this.nCells = 4 * 4;
      this.gridClass = ['grid-4x4'];
      this.size = 'normal';
    }

    this.initGame();
  }

  initGame() {
    this.classCard = ['no_show', 'not_allowed'];
    this.cdr.markForCheck();

    const settings = this.store.settings();
    const allPairs: Cell[] = [];

    let j = 1;
    for (let i = 0; i < this.nCells; i += 2) {
      allPairs.push({
        index: i,
        value: (j % 10) + 1,
        selected: false,
        temporalSelected: false,
      });

      allPairs.push({
        index: i + 1,
        value: (j % 10) + 1,
        selected: false,
        temporalSelected: false,
      });

      j++;
    }

    this.useIcons = settings.theme == 'Icons';
    this.allPairs = shuffle(allPairs, 2);
    this.allPairs.forEach((allPair, idx) => (allPair.index = idx));

    setTimeout(() => {
      this.classCard = [];

      this.cdr.markForCheck();
    }, 300);
  }

  clearSelection() {
    this.allPairs.forEach((allPair) => {
      allPair.temporalSelected = false;
      allPair.selected = false;
    });

    this.cdr.markForCheck();
  }

  selectedCard(idx: number) {
    this.store.updateCurrentMovesGame();

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

    this.cdr.markForCheck();
  }

  checkPairs() {
    this.classCard = ['not_allowed'];
    this.cdr.markForCheck();

    setTimeout(() => {
      const { p0, p1 } = this.pair;

      if (p1 < 0 || p0 < 0) {
        console.error('Error Pair');
        return;
      }

      if (this.allPairs[p0].value === this.allPairs[p1].value) {
        const currentPlayer = this.store.game().currentPlayer;

        [p0, p1].forEach((i) => {
          this.allPairs[i].selected = true;
          this.allPairs[i].temporalSelected = false;
          this.allPairs[i].player = currentPlayer;
        });

        this.store.updateCurrentPairSuccessfulGame();
        this.checkAllPairs();
      } else {
        [p0, p1].forEach((i) => {
          this.allPairs[i].selected = false;
          this.allPairs[i].temporalSelected = false;
        });

        if (this.nPlayers > 0) {
          this.store.moveNextPlayer();
          this.store.updateStatusGame(StatusEnum.ChangePlayer);
        }
      }

      this.pair = {
        p0: -1,
        p1: -1,
      };

      this.pairIndex = 0;
      this.classCard = [];
      this.cdr.markForCheck();
    }, 500);
  }

  async checkAllPairs() {
    const isAllSelected = this.allPairs.every((el) => el.selected);

    if (isAllSelected) {
      this.clearSelection();
      this.store.updateStatusGame(StatusEnum.EndGame);

      const { players } = this.store.game();

      const action = await this.modalResult.open([...players]);

      switch (action) {
        case MODAL_RESULT.RESTART:
          this.store.clearGame();
          this.store.initGame();
          this.store.updateStatusGame(StatusEnum.Restart);

          this.initGame();

          break;
        case MODAL_RESULT.SETUP_NEW_GAME:
          this.router.navigate(['/']);

          break;
      }
    }
  }
}
