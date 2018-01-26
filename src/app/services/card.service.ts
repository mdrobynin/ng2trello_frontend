import { Injectable } from '@angular/core';
import { ICard } from '../interfaces/ICard.interface';
import { Observable } from 'rxjs/Observable';
import { TransportService } from './transport.service';
import { environment } from '../../environments/environment';
import { HttpResponse } from '@angular/common/http';
import { IStatusResponse } from '../interfaces/IStatusResponse.interface';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/find';

@Injectable()
export class CardService {
    constructor(private transport: TransportService) {
    }

    getAllCards(): Observable<ICard[]> {
        const config = {
            url: `${environment.card}`
        }
        return this.transport.get(config)
            .map((res: HttpResponse<any>) => {
                return <ICard[]>res.body;
            });
    }

    getCardById(id: number): Observable<ICard> {
        const config = {
            url: `${environment.card}/${id}`
        }
        return this.transport.get(config)
            .map((res: HttpResponse<any>) => {
                return <ICard>res.body;
            });
    }

    getCardsByBoardId(boardid: number): Observable<ICard[]> {
        const config = {
            url: `${environment.card}/${boardid}`
        }
        return this.transport.post(config)
            .map((res: HttpResponse<any>) => {
                return <ICard[]>res.body;
            });
    }

    getCardsByColumnId(columnid: number): Observable<ICard[]> {
        const config = {
            url: `${environment.column}/${columnid}/cards`
        }
        return this.transport.post(config)
            .map((res: HttpResponse<any>) => {
                return <ICard[]>res.body;
            });
    }

    addCard(card: ICard): Observable<IStatusResponse> {
        const config = {
            url: `${environment.card}`,
            body: { card }
        }
        return this.transport.post(config)
          .map((res: HttpResponse<any>) => {
            return <IStatusResponse> res.body;
          });
    }

    changeCard(id: number, card: ICard): Observable<IStatusResponse> {
        const config = {
            url: `${environment.card}/${id}`,
            body: { card }
        }
      return this.transport.put(config)
        .map((res: HttpResponse<any>) => {
          return <IStatusResponse> res.body;
        });
    }

    deleteCard(id: number): Observable<IStatusResponse> {
        const config = {
            url: `${environment.card}/${id}`
        }
      return this.transport.delete(config)
        .map((res: HttpResponse<any>) => {
          return <IStatusResponse> res.body;
        });
    }
}
