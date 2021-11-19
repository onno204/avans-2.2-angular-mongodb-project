import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppListComponent} from './app-list/app-list.component';
import {AppAddComponent} from './app-add/app-add.component';
import {AppDetailsComponent} from './app-details/app-details.component';

const routes: Routes = [
  {path: 'apps', component: AppListComponent},
  {path: 'app-add', component: AppAddComponent},
  {path: 'app-details/:id', component: AppDetailsComponent},
  {path: '', redirectTo: '/apps', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
