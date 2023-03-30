import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { PreloaderService } from '@lens/app-abstract';
import { PreloaderService as MateroPreloaderService } from './bootstrap/preloader.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    {
      provide: PreloaderService,
      useExisting: MateroPreloaderService
    }
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
