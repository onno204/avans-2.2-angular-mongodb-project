import {Injectable} from '@angular/core';
import {catchError} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {CookieService} from "ngx-cookie-service";
import {HttpHeaders} from '@angular/common/http';
import Swal from "sweetalert2";

const endpoint = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})

export class AppApiService {

  constructor(private http: HttpClient, private cookieService: CookieService) {
  }

  getApps(page: number): Observable<any> {
    return this.http.get(endpoint + 'apps?page=' + page, this.getHeader()).pipe(
      map(AppApiService.extractData),
      catchError(AppApiService.handleError)
    );
  }

  getAllApps(): Observable<any> {
    return this.http.get(endpoint + 'apps?nolimit=1', this.getHeader()).pipe(
      map(AppApiService.extractData),
      catchError(AppApiService.handleError)
    );
  }

  getApp(id: string): Observable<any> {
    return this.http.get(endpoint + 'apps/' + id, this.getHeader()).pipe(
      map(AppApiService.extractData),
      catchError(AppApiService.handleError)
    );
  }

  addApp(app: any): Observable<any> {
    return this.http.post(endpoint + 'apps', app, this.getHeader()).pipe(
      map(AppApiService.extractData),
      catchError(AppApiService.handleError)
    );
  }

  updateApp(id: string, app: Object): Observable<any> {
    return this.http.put(endpoint + 'apps/' + id, app, this.getHeader()).pipe(
      map(AppApiService.extractData),
      catchError(AppApiService.handleError)
    );
  }

  deleteApp(id: string): Observable<any> {
    return this.http.delete(endpoint + 'apps/' + id, this.getHeader()).pipe(
      map(AppApiService.extractData),
      catchError(AppApiService.handleError)
    );
  }

  private getHeader(): { headers: HttpHeaders } {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    try {
      const token = JSON.parse(this.cookieService.get('token') || '[]');
      if (token?.token?.length > 10) {
        httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'Authorization':  'Bearer ' + token.token
          })
        };      }
    }catch { }
    return httpOptions;
  }

  private static extractData(res: Object): any {
    // console.log("incomming:", res)
    return res || {success: false, message: "unknown error"};
  }

  private static handleError(error: any): any {
    console.log("error", error)
    if (error.status === 401) {
      Swal.fire({
        title: 'Error!',
        text: "You are not authorized to access this!",
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    }
    // console.error(error.status, error.error)
    if (error.error) {
      // return error.error
      return of(error.error)
    }
    return throwError('Something bad happened; please try again later.');
  }
}
