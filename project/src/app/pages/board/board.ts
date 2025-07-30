import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';

import { Header } from './components/header/header';
import { Table } from './components/table/table';
import { Footer } from './components/footer/footer';
import { GlobalStore } from '@store';
import { StatusEnum } from '@interfaces/memory';

@Component({
  selector: 'app-board',
  imports: [Header, Table, Footer],
  templateUrl: './board.html',
  styleUrl: './board.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardPage implements OnInit {
  private store = inject(GlobalStore);

  ngOnInit(): void {
    this.store.initGame();
    this.store.updateStatusGame(StatusEnum.Start);
  }
}
