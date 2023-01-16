import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from './components';
import { AuthGuard, DefaultAuthGuard, HasClaimGuard, HasRoleGuard } from './guards';

@NgModule({
  declarations: [UserInfoComponent],
  imports: [CommonModule],
  exports: [UserInfoComponent],
  providers:[
    { provide: AuthGuard, useClass: DefaultAuthGuard },
    HasClaimGuard,
    HasRoleGuard
  ]
})
export class AuthenticationModule {}
