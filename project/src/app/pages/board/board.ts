import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Header } from './components/header/header';
import { Table } from './components/table/table';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-board',
  imports: [Header, Table, Footer],
  templateUrl: './board.html',
  styleUrl: './board.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardPage {}
