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

export class CommentApiService {

  constructor(private http: HttpClient) {
  }

  getComments(page: string): Observable<any> {
    return this.http.get(endpoint + 'comments?commentId=' + page).pipe(
      map(CommentApiService.extractData),
      catchError(CommentApiService.handleError)
    );
  }

  getAllComments(): Observable<any> {
    return this.http.get(endpoint + 'comments?nolimit=1').pipe(
      map(CommentApiService.extractData),
      catchError(CommentApiService.handleError)
    );
  }

  getComment(id: string): Observable<any> {
    return this.http.get(endpoint + 'comments/' + id).pipe(
      map(CommentApiService.extractData),
      catchError(CommentApiService.handleError)
    );
  }

  addComment(comment: any): Observable<any> {
    return this.http.post(endpoint + 'comments', comment).pipe(
      map(CommentApiService.extractData),
      catchError(CommentApiService.handleError)
    );
  }

  updateComment(id: string, comment: Object): Observable<any> {
    return this.http.put(endpoint + 'comments/' + id, comment).pipe(
      map(CommentApiService.extractData),
      catchError(CommentApiService.handleError)
    );
  }

  deleteComment(id: string): Observable<any> {
    return this.http.delete(endpoint + 'comments/' + id).pipe(
      map(CommentApiService.extractData),
      catchError(CommentApiService.handleError)
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
    return throwError('Something bad hcommentened; please try again later.');
  }
}
