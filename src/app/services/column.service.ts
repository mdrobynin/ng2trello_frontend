import { Injectable } from '@angular/core';
import { IColumn } from '../interfaces/IColumn.interface';
import { Observable } from 'rxjs/Observable';
import { TransportService } from './transport.service';
import { environment } from '../../environments/environment';
import { HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import {IStatusResponse} from '../interfaces/IStatusResponse.interface';

@Injectable()
export class ColumnService {
    constructor(private transport: TransportService) {

    }

    getAllColumns(): Observable<IColumn[]> {
        const config = {
            url: `${environment.column}`
        }
        return this.transport.get(config)
            .map((res: HttpResponse<any>) => {
                return <IColumn[]>res.body;
            });
    }

    getColumnById(id: number): Observable<IColumn> {
        const config = {
            url: `${environment.column}/${id}`
        }
        return this.transport.get(config)
            .map((res: HttpResponse<any>) => {
                return <IColumn>res.body;
            });
    }

    getColumnsByBoardId(boardid: number): Observable<IColumn[]> {
        const config = {
            url: `${environment.column}/${boardid}`
        }
        return this.transport.post(config)
            .map((res: HttpResponse<any>) => {
                return <IColumn[]>res.body;
            });
    }

    addColumn(column: IColumn): Observable<IStatusResponse> {
        const config = {
            url: `${environment.column}`,
            body: { column }
        };
        return this.transport.post(config)
          .map((res: HttpResponse<any>) => {
            return <IStatusResponse> res.body;
          });
    }

    deleteColumn(id: number): Observable<IStatusResponse> {
        const config = {
            url: `${environment.column}/${id}`
        };
        return this.transport.delete(config)
          .map((res: HttpResponse<any>) => {
            return <IStatusResponse> res.body;
          });
    }

    changeColumn(id: number, column: IColumn): Observable<IStatusResponse> {
        const config = {
            url: `${environment.column}/${id}`,
            body: { column }
        };
        return this.transport.put(config)
          .map((res: HttpResponse<any>) => {
            return <IStatusResponse> res.body;
          });
    }
}
