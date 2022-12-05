import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@lens/security-abstract';

@Component({
  selector: 'lens-full-layout',
  templateUrl: './full-layout.component.html',
  styleUrls: ['./full-layout.component.scss'],
})
export class FullLayoutComponent implements OnInit {
  title = 'console';
  isAuthenticated = false;
  constructor(public authenticationService: AuthenticationService) {}

  ngOnInit() { 
    this.authenticationService.isAuthenticated$.subscribe(authenticated => { this.isAuthenticated = authenticated; });
  }

  login() {
    this.authenticationService.login();
  }

  logout() {
    this.authenticationService.logout();
  }
}