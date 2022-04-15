import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { ManageAccountComponent } from './manage-account/manage-account.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  {path: '', redirectTo: "login", pathMatch:'full'},
  {path: "login", component: LoginComponent},
  {path: "registration", component: RegistrationComponent},
  {path: "account", component: AccountComponent, canActivate:[AuthService]},
  {path: "account/manage", component: ManageAccountComponent, canActivate:[AuthService]},
  {path: "**", component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [LoginComponent, RegistrationComponent, AccountComponent, ManageAccountComponent, PageNotFoundComponent]
