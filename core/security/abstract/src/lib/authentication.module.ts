import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from './components';
import { AuthGuard, DefaultAuthGuard } from './guards';

@NgModule({
  declarations: [UserInfoComponent],
  imports: [CommonModule],
  exports: [UserInfoComponent],
  providers:[
    { provide: AuthGuard, useClass: DefaultAuthGuard }
  ]
})
export class AuthenticationModule {}
