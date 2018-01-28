import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {ITodoList} from '../../../interfaces/ITodoList.interface';
import {TodoService} from '../../../services/todo.service';
import {Todo} from '../../../interfaces/implementations/Todo';
import {ITodo} from '../../../interfaces/ITodo.interface';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss']
})
export class TodolistComponent implements OnInit, OnDestroy  {
  @Input() public todoList: ITodoList;
  @Output() public todoChanged: EventEmitter<ITodoList> = new EventEmitter<ITodoList>();
  public todoText: string;
  private subscriptions: Subscription[] = [];
  constructor(private todoService: TodoService) { }

  ngOnInit() {
  }

  public addTodo(): void {
    if (this.todoText && this.todoText.length > 0) {
      const todo = new Todo(this.todoText);
      this.todoService.addTodo(this.todoList.Id, todo).subscribe((res) => {
        if (!!res) {
          this.todoChanged.emit(this.todoList);
          this.todoText = '';
        }
      });
    }
  }

  onDeleteTodo(todo: ITodo) {
    this.todoService.deleteTodo(this.todoList.Id, todo.Id).subscribe((res) => {
      if (!!res) {
        this.todoChanged.emit(this.todoList);
      }
    });
  }

  onStatusChange(todo: ITodo) {
    todo.Status = !todo.Status;
    this.todoService.changeTodo(this.todoList.Id, todo).subscribe((res) => {
      if (!!res) {
        this.todoChanged.emit(this.todoList);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }
}
