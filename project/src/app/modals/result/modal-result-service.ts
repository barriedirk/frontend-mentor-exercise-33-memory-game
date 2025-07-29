import { Injectable, inject, ApplicationRef, ComponentRef, createComponent, EnvironmentInjector } from '@angular/core';

import { ModalResult } from './modal-result';
import { Player } from '@interfaces/memory';

@Injectable({ providedIn: 'root' })
export class ModalResultService {
  private appRef = inject(ApplicationRef);
  private injector = inject(EnvironmentInjector);
  private modalRef: ComponentRef<ModalResult> | null = null;

  open(players: Player[]): Promise<any> {
    if (this.modalRef) return Promise.reject('Modal already open');

    this.modalRef = createComponent(ModalResult, {
      environmentInjector: this.injector,
    });

    console.log({ players });
    debugger;

    this.modalRef.instance.players = players.sort((a, b) => a.pairSuccessful - b.pairSuccessful);

    const result = new Promise<any>((resolve) => {
      this.modalRef!.instance.close.subscribe((action) => {
        resolve(action);
        this.close();
      });
    });

    this.appRef.attachView(this.modalRef.hostView);
    document.body.appendChild(this.modalRef.location.nativeElement);

    return result;
  }

  close() {
    if (this.modalRef) {
      this.appRef.detachView(this.modalRef.hostView);
      this.modalRef.destroy();
      this.modalRef = null;
    }
  }
}
