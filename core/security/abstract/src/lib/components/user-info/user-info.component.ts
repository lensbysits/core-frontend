import { Component } from '@angular/core';
import { AuthenticationService } from '../../services';

@Component({
  selector: 'lens-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent {
  constructor(public authenticationService: AuthenticationService) {}
}
