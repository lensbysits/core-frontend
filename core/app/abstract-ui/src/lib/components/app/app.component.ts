import { AfterViewInit, Component } from '@angular/core';
import { PreloaderService } from '@lens/app-abstract';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'frontend-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements AfterViewInit {
  constructor(private preloader: PreloaderService) {}


  ngAfterViewInit() {
    this.preloader.hide();
  }
}
