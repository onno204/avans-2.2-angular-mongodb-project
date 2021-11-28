import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppListComponent} from '../pages/app-list/app-list.component';
import {AppAddComponent} from '../pages/app-add/app-add.component';
import {AppDetailsComponent} from '../pages/app-details/app-details.component';
import {AppUpdateComponent} from '../pages/app-update/app-update.component';
import {AboutComponent} from '../pages/about/about.component';

export const routes: Routes = [
  {path: 'about', component: AboutComponent},
  {path: 'apps', component: AppListComponent},
  {path: 'app-add', component: AppAddComponent},
  {path: 'app-details/:id', component: AppDetailsComponent},
  {path: 'app-update/:id', component: AppUpdateComponent},
  {path: '', redirectTo: '/apps', pathMatch: 'full'}
];

export const components = [
  AppListComponent,
  AppAddComponent,
  AppDetailsComponent,
  AppUpdateComponent,
  AboutComponent
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
