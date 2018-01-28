import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {LocalStorageService} from './local-storage.service';

@Injectable()
export class TransportService {
  constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }

  public get(config: any): Observable<HttpEvent<any>> {
    const headers = this.getHeaders();
    const request: HttpRequest<any> = new HttpRequest<any>('GET', config.url, config.body, { headers });
    return this.http.request(request);
  }

  public post(config: any): Observable<HttpEvent<any>> {
    const headers = this.getHeaders();
    const request: HttpRequest<any> = new HttpRequest<any>('POST', config.url, config.body, { headers });
    return this.http.request(request);
  }

  public put(config: any): Observable<HttpEvent<any>> {
    const headers = this.getHeaders();
    const request: HttpRequest<any> = new HttpRequest<any>('PUT', config.url, config.body, { headers });
    return this.http.request(request);
  }

  public delete(config: any): Observable<HttpEvent<any>> {
    const headers = this.getHeaders();
    const request: HttpRequest<any> = new HttpRequest<any>('DELETE', config.url, config.body, { headers });
    return this.http.request(request);
  }

  private getHeaders(): HttpHeaders {
    const jwt = this.localStorageService.getJwt();
    let headers: HttpHeaders;
    if (!!jwt) {
      headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .append('Authorization', 'Bearer ' + jwt);
    } else {
      headers = new HttpHeaders()
        .set('Content-Type', 'application/json');
    }
    return headers;
  }
}
