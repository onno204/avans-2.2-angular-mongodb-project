import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppAddComponent } from './app-add.component';
import {RouterTestingModule} from "@angular/router/testing";
import {components, routes} from "../../modules/app-routing.module";
import {HttpClientModule} from "@angular/common/http";

describe('AppAddComponent', () => {
  let component: AppAddComponent;
  let fixture: ComponentFixture<AppAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes), HttpClientModule],
      declarations: components.concat([AppAddComponent]),
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
