import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgxPermissionsModule } from 'ngx-permissions';
import { ToastrModule } from 'ngx-toastr';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CoreModule } from './core/core.module';
import { ThemeModule } from './theme/theme.module';
import { SharedModule } from './shared';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { appInitializerProviders } from './core';


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
            appInitializerProviders
          ]
        })
        export class MateroLayoutModule { }
