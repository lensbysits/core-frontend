import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { API_BASE_URL, Client } from './api.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
})
export class MdtApiClientsModule {
  public static forRoot(
    baseUrl: string
  ): ModuleWithProviders<MdtApiClientsModule> {
    return {
      ngModule: MdtApiClientsModule,
      providers: [Client, { provide: API_BASE_URL, useValue: baseUrl }],
    };
  }
}
