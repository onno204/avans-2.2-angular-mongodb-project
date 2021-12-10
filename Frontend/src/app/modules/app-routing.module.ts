import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppListComponent} from '../pages/app-list/app-list.component';
import {AppAddComponent} from '../pages/app-add/app-add.component';
import {AppDetailsComponent} from '../pages/app-details/app-details.component';
import {AppUpdateComponent} from '../pages/app-update/app-update.component';
import {AboutComponent} from '../pages/about/about.component';
import {LoginComponent} from '../pages/login/login.component';
import {UsersComponent} from '../pages/users/users.component';
import {DevicesComponent} from '../pages/devices/devices.component';
import {AddDeviceComponent} from '../pages/add-device/add-device.component';

export const routes: Routes = [
  {path: 'about', component: AboutComponent},
  {path: 'apps', component: AppListComponent},
  {path: 'app-add', component: AppAddComponent},
  {path: 'app-details/:id', component: AppDetailsComponent},
  {path: 'app-update/:id', component: AppUpdateComponent},
  {path: 'login', component: LoginComponent},
  {path: 'users', component: UsersComponent},
  {path: 'devices', component: DevicesComponent},
  {path: 'add-device', component: AddDeviceComponent},
  {path: '', redirectTo: '/apps', pathMatch: 'full'}
];

export const components = [
  AppListComponent,
  AppAddComponent,
  AppDetailsComponent,
  AppUpdateComponent,
  AboutComponent,
  LoginComponent
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
