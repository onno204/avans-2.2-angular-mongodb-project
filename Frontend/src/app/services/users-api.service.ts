import {Injectable} from '@angular/core';
import {catchError} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {CookieService} from "ngx-cookie-service";
import Swal from "sweetalert2";

const endpoint = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})

export class UserApiService {

  constructor(private http: HttpClient, private cookieService: CookieService) {
  }

  getUsers(): Observable<any> {
    return this.http.get(endpoint + 'users', this.getHeader()).pipe(
      map(UserApiService.extractData),
      catchError(UserApiService.handleError)
    );
  }

  getAllUsers(): Observable<any> {
    return this.http.get(endpoint + 'users?nolimit=1', this.getHeader()).pipe(
      map(UserApiService.extractData),
      catchError(UserApiService.handleError)
    );
  }

  getUser(id: string): Observable<any> {
    return this.http.get(endpoint + 'users/' + id, this.getHeader()).pipe(
      map(UserApiService.extractData),
      catchError(UserApiService.handleError)
    );
  }

  addUser(user: any): Observable<any> {
    return this.http.post(endpoint + 'users', user, this.getHeader()).pipe(
      map(UserApiService.extractData),
      catchError(UserApiService.handleError)
    );
  }

  updateUser(id: string, user: Object): Observable<any> {
    return this.http.put(endpoint + 'users/' + id, user, this.getHeader()).pipe(
      map(UserApiService.extractData),
      catchError(UserApiService.handleError)
    );
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(endpoint + 'users/' + id, this.getHeader()).pipe(
      map(UserApiService.extractData),
      catchError(UserApiService.handleError)
    );
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(endpoint + 'login', {email: email, password: password}, this.getHeader()).pipe(
      map(UserApiService.extractData),
      catchError(UserApiService.handleError)
    );
  }

  register(email: string, password: string): Observable<any> {
    return this.http.post(endpoint + 'register', {email: email, password: password}, this.getHeader()).pipe(
      map(UserApiService.extractData),
      catchError(UserApiService.handleError)
    );
  }

  private getHeader(): { headers: HttpHeaders } {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    try {
      const token = JSON.parse(this.cookieService.get('token') || '[]');
      if (token?.token?.length > 10) {
        httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token.token
          })
        };
      }
    } catch {
    }
    return httpOptions;
  }

  private static extractData(res: Object): any {
    return res || {success: false, message: "unknown error"};
  }

  private static handleError(error: any): any {
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
