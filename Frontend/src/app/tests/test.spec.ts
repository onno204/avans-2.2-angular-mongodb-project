import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from "@angular/router/testing";

import {HttpClient, HttpClientModule} from '@angular/common/http';
import {AppListComponent} from '../pages/app-list/app-list.component';
import {AppAddComponent} from '../pages/app-add/app-add.component';
import {AppDetailsComponent} from '../pages/app-details/app-details.component';
import {AppUpdateComponent} from '../pages/app-update/app-update.component';
import {UserApiService} from "../services/users-api.service";

// import { ActivatedRouteStub } from './mock-activate-route';

import {components, routes} from "../modules/app-routing.module"
import { ActivatedRoute, Route, ActivatedRouteSnapshot, Params} from '@angular/router';
import Swal from "sweetalert2";

const targetTestData: any = {
  testId: Math.round(Math.random() * 1000000000),
  createdId: undefined,
  token: ""
}

function set_cookie(name: string, value: string, path: string): void {
  document.cookie = name + "=" + value +";path=/" +
    ";expires=Wed, 01 Jan 2070 00:00:01 GMT";
}
describe('setTest', () => {
  let component_AppAddComponent: AppAddComponent;
  let fixture_AppAddComponent: ComponentFixture<AppAddComponent>;

  let component_AppListComponent: AppListComponent;
  let fixture_AppListComponent: ComponentFixture<AppListComponent>;

  let component_AppDetailsComponent: AppDetailsComponent;
  let fixture_AppDetailsComponent: ComponentFixture<AppDetailsComponent>;

  let component_AppUpdateComponent: AppUpdateComponent;
  let fixture_AppUpdateComponent: ComponentFixture<AppUpdateComponent>;
  let userApi: UserApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes), HttpClientModule, FormsModule],
      declarations: components.concat([AppAddComponent, AppListComponent, AppUpdateComponent, AppDetailsComponent]),
      providers: [UserApiService]
    }).compileComponents();
    userApi = TestBed.get(UserApiService);
  });

  beforeEach(() => {
    fixture_AppAddComponent = TestBed.createComponent(AppAddComponent);
    fixture_AppAddComponent.detectChanges();
    component_AppAddComponent = fixture_AppAddComponent.componentInstance;

    fixture_AppListComponent = TestBed.createComponent(AppListComponent);
    fixture_AppListComponent.detectChanges();
    component_AppListComponent = fixture_AppListComponent.componentInstance;

    fixture_AppUpdateComponent = TestBed.createComponent(AppUpdateComponent);
    fixture_AppUpdateComponent.detectChanges();
    component_AppUpdateComponent = fixture_AppUpdateComponent.componentInstance;

    fixture_AppDetailsComponent = TestBed.createComponent(AppDetailsComponent);
    fixture_AppDetailsComponent.detectChanges();
    component_AppDetailsComponent = fixture_AppDetailsComponent.componentInstance;
  });

  it('should create all components', () => {
    expect(component_AppAddComponent).toBeTruthy();
    expect(component_AppListComponent).toBeTruthy();
    expect(component_AppUpdateComponent).toBeTruthy();
    expect(component_AppDetailsComponent).toBeTruthy();
  });

  it('should have no preset data in the create', () => {
    expect(component_AppAddComponent.appData.name).toBe('');
    expect(component_AppAddComponent.appData.description).toBe('');
    expect(component_AppAddComponent.appData.category).toBe('');
    expect(component_AppAddComponent.appData.public).toBe(false);
    expect(component_AppAddComponent.appData.icon).toBe('');
  });

  describe('Create admin user', () => {
    it('Should create an admin user', (done) => {
      userApi.register("test@test.com", "123").subscribe((res) => {
        userApi.getUsers().subscribe((res2) => {
          let foundUser: any = null;
          if (res2.success){
            Object.values(res2.data).forEach((user: any) => {
              if (user.email === "test@test.com") {
                foundUser = user;
              }
            })
          }
          expect(foundUser).not.toBeNull();
          userApi.login("test@test.com", "123").subscribe((res) => {
            if (res.success) {
              targetTestData.token = res.data.token;
            }
            expect(targetTestData.token).not.toBe('');
            set_cookie('token', JSON.stringify(res.data), '/')
            done();
          });
        });
      });
    });
  });

  describe('CRUD apps', () => {
    it('Filling form data and saving should create a new app', () => {
      component_AppAddComponent.appData.name = `TestApp${targetTestData.testId}`;
      component_AppAddComponent.appData.description = "Test App description";
      component_AppAddComponent.appData.category = "Category test";
      component_AppAddComponent.appData.public = true;
      component_AppAddComponent.appData.icon = "data:image/gif;base64,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";
      expect(component_AppAddComponent.appData.name).toBe(`TestApp${targetTestData.testId}`);
      component_AppAddComponent.addApp();
    });

    it('Searching the app list should show the new app', (done) => {
      component_AppListComponent.getAllApps(async () => {
        fixture_AppListComponent.detectChanges()
        await fixture_AppListComponent.whenStable();
        const DOM: HTMLElement = fixture_AppListComponent.nativeElement;
        const elmt: HTMLElement | null = DOM.querySelector(`#TestApp${targetTestData.testId}`);
        expect(elmt).not.toBeNull();
        const id: string | undefined = elmt?.parentElement?.parentElement?.id;
        expect(id).not.toBeUndefined();
        targetTestData.createdId = id;
        done();
      })
    });

    it('Should delete the app', (done) => {
      // queryParams.pipe(map((res) => { console.log("res", res); }));
      // activatedRouteStub.paramMap.id = targetTestData.testId;
      // activatedRoute.paramMap.set({id: targetTestData.testId});
      // activatedRoute.setParamMap({id: "12"});
      // const subRouteSpy = spyOn(activatedRoute.paramMap, "subscribe");
      fixture_AppDetailsComponent.detectChanges();
      component_AppDetailsComponent.ngOnInit();
      component_AppDetailsComponent.rest.deleteApp(targetTestData.testId);

      const fn = async () => {
        await fixture_AppDetailsComponent.whenStable();
        // await waitUntil(() =>)
        expect(component_AppDetailsComponent.appData).not.toBeUndefined();
        // expect(component_AppDetailsComponent.appData._id).toBe(targetTestData.createdId);
        done();
      };
      fn();
    });
  })
});

