import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {ITodo} from '../../../interfaces/ITodo.interface';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit, OnDestroy {
  @Input() public todo: ITodo;
  @Output() public deleted: EventEmitter<ITodo> = new EventEmitter<ITodo>();
  @Output() public statusChanged: EventEmitter<ITodo> = new EventEmitter<ITodo>();
  private subscriptions: Subscription[] = [];
  constructor() { }

  ngOnInit() {
  }

  public deleteHandler(): void {
    this.deleted.emit(this.todo);
  }

  public onStatusChange(): void {
    this.statusChanged.emit(this.todo);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }
}
