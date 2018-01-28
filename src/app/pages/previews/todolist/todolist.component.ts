import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {ITodoList} from '../../../interfaces/ITodoList.interface';
import {TodoService} from '../../../services/todo.service';
import {Todo} from '../../../interfaces/implementations/Todo';
import {ITodo} from '../../../interfaces/ITodo.interface';
import {CardActionService} from '../../../services/card-action.service';
import {ICardAction} from '../../../interfaces/ICardAction.interface';
import {CardAction} from '../../../interfaces/implementations/CardAction';
import {UsersService} from '../../../services/users.service';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss']
})
export class TodolistComponent implements OnInit, OnDestroy  {
  @Input() public cardId: number;
  @Input() public todoList: ITodoList;
  @Output() public todoChanged: EventEmitter<ITodoList> = new EventEmitter<ITodoList>();
  @Output() public cardActionsChanged: EventEmitter<void> = new EventEmitter<void>();

  public todoText: string;
  private subscriptions: Subscription[] = [];
  constructor(private todoService: TodoService,
              private userService: UsersService,
              private cardActionService: CardActionService) { }

  ngOnInit() {
  }

  public addTodo(): void {
    if (this.todoText && this.todoText.length > 0) {
      const todo = new Todo(this.todoText);
      const sub = this.todoService.addTodo(this.todoList.Id, todo).subscribe((res) => {
        if (!!res) {
          const cardAction = new CardAction(`Todo ${todo.Text} was created`, this.cardId, this.userService.getUser().Id);
          this.addCardAction(cardAction);
          this.todoChanged.emit(this.todoList);
          this.todoText = '';
        }
      });
      this.subscriptions.push(sub);
    }
  }

  onDeleteTodo(todo: ITodo) {
    const sub = this.todoService.deleteTodo(this.todoList.Id, todo.Id).subscribe((res) => {
      if (!!res) {
        const cardAction = new CardAction(`Todo ${todo.Text} was deleted`, this.cardId, this.userService.getUser().Id);
        this.addCardAction(cardAction);
        this.todoChanged.emit(this.todoList);
      }
    });
    this.subscriptions.push(sub);
  }

  onStatusChange(todo: ITodo) {
    todo.Status = !todo.Status;
    const sub = this.todoService.changeTodo(this.todoList.Id, todo).subscribe((res) => {
      if (!!res) {
        this.todoChanged.emit(this.todoList);
      }
    });
    this.subscriptions.push(sub);
  }

  addCardAction(cardAction: ICardAction): void {
    const sub = this.cardActionService.addCardAction(cardAction).subscribe((res) => {
      if (!!res) {
        this.cardActionsChanged.emit();
      }
    });
    this.subscriptions.push(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }
}
