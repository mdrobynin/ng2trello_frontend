import { Injectable } from '@angular/core';
import { ITodoList } from '../interfaces/ITodoList.interface';
import { ITodo } from '../interfaces/ITodo.interface';
import { Observable } from 'rxjs/Observable';
import { TransportService } from './transport.service';
import { environment } from '../../environments/environment';
import { HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import {IStatusResponse} from '../interfaces/IStatusResponse.interface';

@Injectable()
export class TodoService {
  constructor(private transport: TransportService) {

  }

  getTodoListById(id: number): Observable<ITodoList> {
    const config = {
      url: `${environment.todolist}/${id}`
    };
    return this.transport.get(config)
      .map((res: HttpResponse<any>) => {
        return <ITodoList>res.body;
      });
  }

  addTodo(todolistid: number, todo: ITodo): Observable<IStatusResponse> {
    const config = {
      url: `${environment.todo}/${todolistid}`,
      body: { todo }
    };
    return this.transport.post(config)
      .map((res: HttpResponse<any>) => {
        return <IStatusResponse> res.body;
      });
  }

  deleteTodo(todolistid: number, id: number): Observable<IStatusResponse> {
    const config = {
      url: `${environment.todo}/${todolistid}/${id}`
    };
    return this.transport.delete(config)
      .map((res: HttpResponse<any>) => {
        return <IStatusResponse> res.body;
      });
  }

  changeTodo(todolistid: number, todo: ITodo): Observable<IStatusResponse> {
    const config = {
      url: `${environment.todo}/${todolistid}/${todo.Id}`,
      body: { todo }
    };
    return this.transport.put(config)
      .map((res: HttpResponse<any>) => {
        return <IStatusResponse> res.body;
      });
  }
}
