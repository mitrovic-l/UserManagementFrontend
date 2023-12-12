import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { canreadGuard } from './guards/canread.guard';
import { AdduserComponent } from './components/adduser/adduser.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    canActivate: [canreadGuard]
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "add",
    component: AdduserComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
