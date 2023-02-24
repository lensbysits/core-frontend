import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { PreloaderService as LensPreloaderService } from '@lens/app-abstract';

@Injectable({
  providedIn: 'root',
})
export class PreloaderService extends LensPreloaderService {
  private selector = 'globalLoader';

  constructor(@Inject(DOCUMENT) private document: Document) { super(); }

  private getElement() {
    return this.document.getElementById(this.selector);
  }

  hide() {
    console.log("matero hiding loader");
    const el = this.getElement();
    if (el) {
      el.addEventListener('transitionend', () => {
        el.className = 'global-loader-hidden';
      });

      if (!el.classList.contains('global-loader-hidden')) {
        el.className += ' global-loader-fade-out';
      }
    }
  }
}
