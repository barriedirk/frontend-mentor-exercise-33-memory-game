import { Routes } from '@angular/router';

import { MainPage } from '@pages/main/main';
import { PageNotFound } from '@pages/page-not-found/page-not-found';

import { boardAccessGuard } from '@guards/board-access-guard';

export const routes: Routes = [
  { path: '', component: MainPage },
  // {
  //   path: 'board',
  //   loadComponent: () => import('./pages/board/board').then((p) => p.BoardPage),
  //   canActivate: [boardAccessGuard],
  // },
  {
    path: 'board',
    loadComponent: () => import('./pages/board/board').then((p) => p.BoardPage),
  },
  { path: '**', component: PageNotFound },
];
