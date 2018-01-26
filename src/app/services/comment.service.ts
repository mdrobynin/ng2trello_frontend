import { Injectable } from '@angular/core';
import { IComment } from '../interfaces/IComment.interface';
import { Observable } from 'rxjs/Observable';
import { TransportService } from './transport.service';
import { environment } from '../../environments/environment';
import { HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { IStatusResponse } from '../interfaces/IStatusResponse.interface';
import { paths } from '../constants';

@Injectable()
export class CommentService {

  constructor(private transport: TransportService) { }

  getAllComments(): Observable<IComment[]> {
    const config = {
      url: `${environment.comment}`
    }
    return this.transport.get(config)
      .map((res: HttpResponse<any>) => {
        return <IComment[]>res.body;
      });
  }

  getCommentById(id: number): Observable<IComment> {
    const config = {
      url: `${environment.comment}/${id}`
    }
    return this.transport.get(config)
      .map((res: HttpResponse<any>) => {
        return <IComment>res.body;
      });
  }

  getCommentsByCardId(cardid: number): Observable<IComment[]> {
    const config = {
      url: `${environment.card}/${cardid}/${paths.comments}`
    }
    return this.transport.get(config)
      .map((res: HttpResponse<any>) => {
        return <IComment[]>res.body;
      });
  }

  addComment(comment: IComment): Observable<IStatusResponse> {
    const config = {
      url: `${environment.comment}`,
      body: { comment }
    };
    return this.transport.post(config)
      .map((res: HttpResponse<any>) => {
        return <IStatusResponse>res.body;
      });
  }

  deleteComment(id: number): Observable<IStatusResponse> {
    const config = {
      url: `${environment.comment}/${id}`
    };
    return this.transport.delete(config)
      .map((res: HttpResponse<any>) => {
        return <IStatusResponse>res.body;
      });
  }

  changeComment(id: number, comment: IComment): Observable<IStatusResponse> {
    const config = {
      url: `${environment.comment}/${id}`,
      body: { comment }
    };
    return this.transport.put(config)
      .map((res: HttpResponse<any>) => {
        return <IStatusResponse>res.body;
      });
  }
}
