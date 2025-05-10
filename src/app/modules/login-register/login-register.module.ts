import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRegisterComponent } from './components/login-register/login-register.component';
import { LoginRegisterRoutingModule } from './login-register-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    LoginRegisterComponent
  ],
  imports: [
    CommonModule,
    LoginRegisterRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class LoginRegisterModule { }
