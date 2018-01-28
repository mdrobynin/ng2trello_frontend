import {Injectable} from '@angular/core';
import {ICardAction} from '../interfaces/ICardAction.interface';
import {Observable} from 'rxjs/Observable';
import {TransportService} from './transport.service';
import {environment} from '../../environments/environment';
import {HttpResponse} from '@angular/common/http';
import {IStatusResponse} from '../interfaces/IStatusResponse.interface';
import {paths} from '../constants';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/find';

@Injectable()
export class CardActionService {
  constructor(private transport: TransportService) {
  }

  getAllCardActions(): Observable<ICardAction[]> {
    const config = {
      url: `${environment.cardAction}`
    };
    return this.transport.get(config)
      .map((res: HttpResponse<any>) => {
        return <ICardAction[]>res.body;
      });
  }

  getCardActionById(id: number): Observable<ICardAction> {
    const config = {
      url: `${environment.cardAction}/${id}`
    };
    return this.transport.get(config)
      .map((res: HttpResponse<any>) => {
        return <ICardAction>res.body;
      });
  }

  getCardActionsByCardId(cardid: number): Observable<ICardAction[]> {
    const config = {
      url: `${environment.card}/${cardid}/${paths.cardActions}`
    };
    return this.transport.get(config)
      .map((res: HttpResponse<any>) => {
        return <ICardAction[]>res.body;
      });
  }

  addCardAction(cardAction: ICardAction): Observable<IStatusResponse> {
    const config = {
      url: `${environment.cardAction}`,
      body: {cardAction}
    };
    return this.transport.post(config)
      .map((res: HttpResponse<any>) => {
        return <IStatusResponse> res.body;
      });
  }

  changeCardAction(id: number, cardAction: ICardAction): Observable<IStatusResponse> {
    const config = {
      url: `${environment.cardAction}/${id}`,
      body: {cardAction}
    };
    return this.transport.put(config)
      .map((res: HttpResponse<any>) => {
        return <IStatusResponse> res.body;
      });
  }

  deleteCardAction(id: number): Observable<IStatusResponse> {
    const config = {
      url: `${environment.cardAction}/${id}`
    };
    return this.transport.delete(config)
      .map((res: HttpResponse<any>) => {
        return <IStatusResponse> res.body;
      });
  }
}
