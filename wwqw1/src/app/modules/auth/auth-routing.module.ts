import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountInfoComponent } from './components/account-info/account-info.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import { NewAccountComponent } from './components/new-account/new-account.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'account-info', component: AccountInfoComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'login', component: LoginComponent },
      { path: 'new-account', component: NewAccountComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
