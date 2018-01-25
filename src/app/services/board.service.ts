import {Injectable} from '@angular/core';
import {IBoard} from '../interfaces/IBoard.interface';
import {Observable} from 'rxjs/Observable';
import {TransportService} from './transport.service';
import {environment} from '../../environments/environment';
import {HttpResponse} from '@angular/common/http';
import {IStatusResponse} from '../interfaces/IStatusResponse.interface';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

@Injectable()
export class BoardService {
  constructor(private transport: TransportService) {
  }

  getAllBoards(): Observable<IBoard[]> {
    const config = {
      url: `${environment.board}`
    };
    return this.transport.get(config)
      .map((res: HttpResponse<any>) => {
        return <IBoard[]> res.body;
      });
  }

  getBoardById(id: number): Observable<IBoard> {
    const config = {
      url: `${environment.board}/${id}`
    };
    return this.transport.get(config)
      .map((res: HttpResponse<any>) => {
        return <IBoard> res.body;
      });
  }

  addBoard(board: IBoard): Observable<IStatusResponse> {
    const config = {
      url: `${environment.board}`,
      body: {board}
    };
    return this.transport.post(config)
      .map((res: HttpResponse<any>) => {
        return <IStatusResponse> res.body;
      });
  }

  deleteBoard(id: number): Observable<IStatusResponse> {
    const config = {
      url: `${environment.board}/${id}`
    };
    return this.transport.delete(config)
      .map((res: HttpResponse<any>) => {
        return <IStatusResponse> res.body;
      });
  }

  changeBoard(id: number, board: IBoard): Observable<IStatusResponse> {
    const config = {
      url: `${environment.board}/${id}`,
      body: {board}
    };
    return this.transport.put(config)
      .map((res: HttpResponse<any>) => {
        return <IStatusResponse> res.body;
      });
  }
}
