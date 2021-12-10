import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './modules/app-routing.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './pages/main/app.component';

import { AppListComponent } from './pages/app-list/app-list.component';
import { AppAddComponent } from './pages/app-add/app-add.component';
import { AppDetailsComponent } from './pages/app-details/app-details.component';
import { NavbarComponent } from './templates/navbar/navbar.component';
import { AboutComponent } from './pages/about/about.component';
import { AppUpdateComponent } from './pages/app-update/app-update.component';
import { LoginComponent } from './pages/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    AppListComponent,
    AppAddComponent,
    AppDetailsComponent,
    NavbarComponent,
    AboutComponent,
    AppUpdateComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
