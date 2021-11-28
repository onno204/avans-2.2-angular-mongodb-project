import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HttpClientModule} from '@angular/common/http';
import {AppListComponent} from '../pages/app-list/app-list.component';
import {AppAddComponent} from '../pages/app-add/app-add.component';
import {AppDetailsComponent} from '../pages/app-details/app-details.component';
import {AppUpdateComponent} from '../pages/app-update/app-update.component';
import {AboutComponent} from '../pages/about/about.component';

import {components, routes} from "../modules/app-routing.module"
import {RouterTestingModule} from "@angular/router/testing";
import {NavbarComponent} from "../templates/navbar/navbar.component";

describe('AppUpdateComponent', () => {
  let component: AppUpdateComponent;
  let fixture: ComponentFixture<AppUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes), HttpClientModule],
      declarations: components.concat([NavbarComponent, AppUpdateComponent]),
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
