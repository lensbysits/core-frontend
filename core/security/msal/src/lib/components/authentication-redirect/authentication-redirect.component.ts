import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { concatMap } from 'rxjs';

@Component({
  selector: 'lens-authentication-redirect',
  template: '',
  styles: [],
})
export class AuthenticationRedirectComponent implements OnInit {
  
  constructor(private authService: MsalService) { }
  
  ngOnInit(): void {    
    this.authService.initialize().pipe(
      concatMap(() => {
          return this.authService.handleRedirectObservable();
      })
  ).subscribe();
  }
}
