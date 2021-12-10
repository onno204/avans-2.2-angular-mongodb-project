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

export class CommentApiService {

  constructor(private http: HttpClient, private cookieService: CookieService) {
  }

  getComments(page: string): Observable<any> {
    return this.http.get(endpoint + 'comments?commentId=' + page, this.getHeader()).pipe(
      map(CommentApiService.extractData),
      catchError(CommentApiService.handleError)
    );
  }

  getAllComments(): Observable<any> {
    return this.http.get(endpoint + 'comments?nolimit=1', this.getHeader()).pipe(
      map(CommentApiService.extractData),
      catchError(CommentApiService.handleError)
    );
  }

  getComment(id: string): Observable<any> {
    return this.http.get(endpoint + 'comments/' + id, this.getHeader()).pipe(
      map(CommentApiService.extractData),
      catchError(CommentApiService.handleError)
    );
  }

  addComment(comment: any): Observable<any> {
    return this.http.post(endpoint + 'comments', comment, this.getHeader()).pipe(
      map(CommentApiService.extractData),
      catchError(CommentApiService.handleError)
    );
  }

  updateComment(id: string, comment: Object): Observable<any> {
    return this.http.put(endpoint + 'comments/' + id, comment, this.getHeader()).pipe(
      map(CommentApiService.extractData),
      catchError(CommentApiService.handleError)
    );
  }

  deleteComment(id: string): Observable<any> {
    return this.http.delete(endpoint + 'comments/' + id, this.getHeader()).pipe(
      map(CommentApiService.extractData),
      catchError(CommentApiService.handleError)
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
