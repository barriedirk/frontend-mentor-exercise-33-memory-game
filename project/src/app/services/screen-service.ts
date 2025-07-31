import { Injectable } from '@angular/core';
import { fromEvent, startWith, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ScreenService {
  isWide$ = fromEvent(window, 'resize').pipe(
    startWith(null),
    map(() => window.matchMedia('(min-width: 513px)').matches),
  );
}
