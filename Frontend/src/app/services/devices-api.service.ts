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

export class DeviceApiService {

  constructor(private http: HttpClient, private cookieService: CookieService) {
  }

  getDevices(): Observable<any> {
    return this.http.get(endpoint + 'devices', this.getHeader()).pipe(
      map(DeviceApiService.extractData),
      catchError(DeviceApiService.handleError)
    );
  }

  getAllDevices(): Observable<any> {
    return this.http.get(endpoint + 'devices?nolimit=1', this.getHeader()).pipe(
      map(DeviceApiService.extractData),
      catchError(DeviceApiService.handleError)
    );
  }

  getDevice(id: string): Observable<any> {
    return this.http.get(endpoint + 'devices/' + id, this.getHeader()).pipe(
      map(DeviceApiService.extractData),
      catchError(DeviceApiService.handleError)
    );
  }

  addDevice(device: any): Observable<any> {
    return this.http.post(endpoint + 'devices', device, this.getHeader()).pipe(
      map(DeviceApiService.extractData),
      catchError(DeviceApiService.handleError)
    );
  }

  updateDevice(id: string, device: Object): Observable<any> {
    return this.http.put(endpoint + 'devices/' + id, device, this.getHeader()).pipe(
      map(DeviceApiService.extractData),
      catchError(DeviceApiService.handleError)
    );
  }

  deleteDevice(id: string): Observable<any> {
    return this.http.delete(endpoint + 'devices/' + id, this.getHeader()).pipe(
      map(DeviceApiService.extractData),
      catchError(DeviceApiService.handleError)
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
      if (error.message !== undefined){
        return of(error)
      }
      return of(error.error)
    }
    return throwError('Something bad happened; please try again later.');
  }
}
