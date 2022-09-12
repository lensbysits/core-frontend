import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from './components';

@NgModule({
  declarations: [UserInfoComponent],
  imports: [CommonModule],
  exports: [UserInfoComponent]
})
export class AuthenticationModule {}
