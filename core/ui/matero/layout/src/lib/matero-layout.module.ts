import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgxPermissionsModule } from 'ngx-permissions';
import { ToastrModule } from 'ngx-toastr';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CoreModule } from './core/core.module';
import { ThemeModule } from './theme/theme.module';
import { HttpErrorHandlerService, PaginatorI18nService, SharedModule } from './shared';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { appInitializerProviders } from './core';
import { HttpErrorHandlerService as LensHttpErrorHandlerService } from '@lens/app-abstract';
import { MatPaginatorIntl } from '@angular/material/paginator';


// Required for AOT compilation
export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    CoreModule,
    ThemeModule,
    SharedModule,
    NgxPermissionsModule.forRoot(),
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateHttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    BrowserAnimationsModule,
  ],
  declarations: [
  ],
  exports: [
    ThemeModule
  ],
  providers: [
    appInitializerProviders,
    {
      provide: MatPaginatorIntl,
      deps: [PaginatorI18nService],
      useFactory: (paginatorI18nSrv: PaginatorI18nService) => paginatorI18nSrv.getPaginatorIntl(),
    }
  ]
})
export class MateroLayoutModule {
  public static usingConfig(config: { useHttpErrorHandler: boolean }): ModuleWithProviders<MateroLayoutModule> {
    const providers: Array<Provider> = [];

    if (config.useHttpErrorHandler) {
      providers.push({
        provide: LensHttpErrorHandlerService,
        useClass: HttpErrorHandlerService
      })
    }
    return {
      ngModule: MateroLayoutModule,
      providers: providers
    };
  }
}
