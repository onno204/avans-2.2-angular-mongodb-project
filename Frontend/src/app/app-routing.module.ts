import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppListComponent} from './app-list/app-list.component';
import {AppAddComponent} from './app-add/app-add.component';
import {AppDetailsComponent} from './app-details/app-details.component';
import {AppUpdateComponent} from './app-update/app-update.component';
import {AboutComponent} from './about/about.component';

const routes: Routes = [
  {path: 'about', component: AboutComponent},
  {path: 'apps', component: AppListComponent},
  {path: 'app-add', component: AppAddComponent},
  {path: 'app-details/:id', component: AppDetailsComponent},
  {path: 'app-update/:id', component: AppUpdateComponent},
  {path: '', redirectTo: '/apps', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
