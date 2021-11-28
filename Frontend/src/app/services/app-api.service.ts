import {Injectable} from '@angular/core';
import {catchError} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

const endpoint = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})

export class AppApiService {

  constructor(private http: HttpClient) {
  }

  getApps(page: number): Observable<any> {
    return this.http.get(endpoint + 'apps?page=' + page).pipe(
      map(AppApiService.extractData),
      catchError(AppApiService.handleError)
    );
  }

  getAllApps(): Observable<any> {
    return this.http.get(endpoint + 'apps?nolimit=1').pipe(
      map(AppApiService.extractData),
      catchError(AppApiService.handleError)
    );
  }

  getApp(id: string): Observable<any> {
    return this.http.get(endpoint + 'apps/' + id).pipe(
      map(AppApiService.extractData),
      catchError(AppApiService.handleError)
    );
  }

  addApp(app: any): Observable<any> {
    return this.http.post(endpoint + 'apps', app).pipe(
      map(AppApiService.extractData),
      catchError(AppApiService.handleError)
    );
  }

  updateApp(id: string, app: Object): Observable<any> {
    return this.http.put(endpoint + 'apps/' + id, app).pipe(
      map(AppApiService.extractData),
      catchError(AppApiService.handleError)
    );
  }

  deleteApp(id: string): Observable<any> {
    return this.http.delete(endpoint + 'apps/' + id).pipe(
      map(AppApiService.extractData),
      catchError(AppApiService.handleError)
    );
  }

  private static extractData(res: Object): any {
    // console.log("incomming:", res)
    return res || { success: false, message: "unknown error" };
  }

  private static handleError(error: any): any {
    // console.error(error.status, error.error)
    if (error.error){
      // return error.error
      return of(error.error)
    }
    return throwError('Something bad happened; please try again later.');
  }
}
