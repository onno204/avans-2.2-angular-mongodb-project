import {Injectable} from '@angular/core';
import {catchError} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

const endpoint = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})

export class UserApiService {

  constructor(private http: HttpClient) {
  }

  getUsers(page: string): Observable<any> {
    return this.http.get(endpoint + 'users?userId=' + page).pipe(
      map(UserApiService.extractData),
      catchError(UserApiService.handleError)
    );
  }

  getAllUsers(): Observable<any> {
    return this.http.get(endpoint + 'users?nolimit=1').pipe(
      map(UserApiService.extractData),
      catchError(UserApiService.handleError)
    );
  }

  getUser(id: string): Observable<any> {
    return this.http.get(endpoint + 'users/' + id).pipe(
      map(UserApiService.extractData),
      catchError(UserApiService.handleError)
    );
  }

  addUser(user: any): Observable<any> {
    return this.http.post(endpoint + 'users', user).pipe(
      map(UserApiService.extractData),
      catchError(UserApiService.handleError)
    );
  }

  updateUser(id: string, user: Object): Observable<any> {
    return this.http.put(endpoint + 'users/' + id, user).pipe(
      map(UserApiService.extractData),
      catchError(UserApiService.handleError)
    );
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(endpoint + 'users/' + id).pipe(
      map(UserApiService.extractData),
      catchError(UserApiService.handleError)
    );
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(endpoint + 'login', {email: email, password: password}).pipe(
      map(UserApiService.extractData),
      catchError(UserApiService.handleError)
    );
  }

  register(email: string, password: string): Observable<any> {
    return this.http.post(endpoint + 'register', {email: email, password: password}).pipe(
      map(UserApiService.extractData),
      catchError(UserApiService.handleError)
    );
  }

  private static extractData(res: Object): any {
    console.log("incomming:", res)
    return res || {success: false, message: "unknown error"};
  }

  private static handleError(error: any): any {
    // console.error(error.status, error.error)
    if (error.error) {
      // return error.error
      return of(error.error)
    }
    return throwError('Something bad huserened; please try again later.');
  }
}
