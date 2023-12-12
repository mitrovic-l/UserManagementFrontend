import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
//import { AdduserComponent } from './components/adduser/adduser.component';
import { AdduserComponent } from './components/adduser/adduser.component';
import { RolePipe } from './pipes/role.pipe'
@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    AppComponent,
    AdduserComponent,
    RolePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
