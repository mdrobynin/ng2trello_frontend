import { Injectable } from '@angular/core';
import { ITeam } from '../interfaces/ITeam.interface';
import { Observable } from 'rxjs/Observable';
import { TransportService } from './transport.service';
import { environment } from '../../environments/environment';
import { HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { IStatusResponse } from '../interfaces/IStatusResponse.interface';
import { paths } from '../constants';

@Injectable()
export class TeamsService {

  constructor(private transport: TransportService) { }
  
  getAllTeams(): Observable<ITeam[]> {
    const config = {
      url: `${environment.team}`
    }
    return this.transport.get(config)
      .map((res: HttpResponse<any>) => {
        return <ITeam[]>res.body;
      });
  }

  getTeamById(id: number): Observable<ITeam> {
    const config = {
      url: `${environment.team}/${id}`
    }
    return this.transport.get(config)
      .map((res: HttpResponse<any>) => {
        return <ITeam>res.body;
      });
  }

  addTeam(team: ITeam): Observable<IStatusResponse> {
    const config = {
      url: `${environment.team}`,
      body: { team }
    };
    return this.transport.post(config)
      .map((res: HttpResponse<any>) => {
        return <IStatusResponse>res.body;
      });
  }

  deleteTeam(id: number): Observable<IStatusResponse> {
    const config = {
      url: `${environment.team}/${id}`
    };
    return this.transport.delete(config)
      .map((res: HttpResponse<any>) => {
        return <IStatusResponse>res.body;
      });
  }

  changeTeam(id: number, team: ITeam): Observable<IStatusResponse> {
    const config = {
      url: `${environment.team}/${id}`,
      body: { team }
    };
    return this.transport.put(config)
      .map((res: HttpResponse<any>) => {
        return <IStatusResponse>res.body;
      });
  }
}
