import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/IUser.interface';
import { Observable } from 'rxjs/Observable';
import { TransportService } from './transport.service';
import { environment } from '../../environments/environment';
import { HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import {IStatusResponse} from '../interfaces/IStatusResponse.interface';
import {LocalStorageService} from './local-storage.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class UsersService {
  private currentUser = new BehaviorSubject<IUser>(undefined);
  constructor(private transportService: TransportService,
              private localStorageService: LocalStorageService) { }

  public get user(): Observable<IUser> {
    return this.currentUser.asObservable();
  }

  public register(username: string, password: string): Observable<IStatusResponse> {
    const config = {
      body: { username, password},
      url: `${environment.account}/register`
    };
    return this.transportService.post(config)
      .map((res: HttpResponse<any>) => {
        if (res && res.body) {
          this.localStorageService.writeJwt(res.body.token);
          return <IStatusResponse> res.body;
        }
      });
  }

  public login(username: string, password: string): Observable<IStatusResponse> {
    const config = {
      body: { username, password},
      url: `${environment.account}/login`
    };
    return this.transportService.post(config)
      .map((res: HttpResponse<any>) => {
        if (res && res.body) {
          this.localStorageService.writeJwt(res.body.token);
          return <IStatusResponse> res.body;
        }
      });
  }

  public getData(): Observable<IUser> {
    const token = this.localStorageService.getJwt();
    if (!!token) {
      const config = {
        url: `${environment.account}/data`,
        token
      };
      return this.transportService.post(config)
        .map((res: HttpResponse<any>) => {
          if (res && res.body) {
            const user = <IUser> res.body;
            this.currentUser.next(user);
            return user;
          }
        });
    }
    return new Observable<IUser>();
  }

  public logout(): void {
    this.localStorageService.deleteItem('token');
  }
}
