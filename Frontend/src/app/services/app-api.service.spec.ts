import { TestBed } from '@angular/core/testing';

import { AppApiService } from './app-api.service';
import {RouterTestingModule} from "@angular/router/testing";
import {AppComponent} from "../pages/main/app.component";
import {NavbarComponent} from "../templates/navbar/navbar.component";
import {HttpClientModule} from "@angular/common/http";

describe('RestService', () => {
  let service: AppApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
    })
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
