import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Router} from '@angular/router';
import {CardService} from '../../services/card.service';
import {ICard} from '../../interfaces/ICard.interface';
import {CardActionService} from '../../services/card-action.service';
import {TodoService} from '../../services/todo.service';
import {ITodoList} from '../../interfaces/ITodoList.interface';
import {ICardAction} from '../../interfaces/ICardAction.interface';
import {IComment} from '../../interfaces/IComment.interface';
import {CommentService} from '../../services/comment.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnDestroy {
  public card: ICard;
  public todoList: ITodoList;
  public cardActions: ICardAction[] = [];
  public comments: IComment[] = [];
  private cardId: number;
  private subscriptions: Subscription[] = [];

  constructor(private router: Router,
              private cardActionsService: CardActionService,
              private commentsService: CommentService,
              private todoService: TodoService,
              private cardService: CardService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getParams();
  }

  public onAddTodo(): void {
    this.getTodolist();
  }

  public onCardActionsChanged(): void {
    this.getCardActions();
  }

  public onCommentChange(): void {
    this.getComments();
  }

  private getParams(): void {
    const sub = this.route.params.subscribe((params) => {
      this.cardId = +params['id'];
      this.getCard();
    });
    this.subscriptions.push(sub);
  }

  private getCard(): void {
    const sub = this.cardService.getCardById(this.cardId).subscribe((card: ICard) => {
      if (!!card) {
        this.card = card;
        this.getCardActions();
        this.getComments();
        this.getTodolist();
      }
    });
    this.subscriptions.push(sub);
  }

  private getCardActions(): void {
    const sub = this.cardActionsService.getCardActionsByCardId(this.cardId).subscribe((cardActions: ICardAction[]) => {
      if (!!cardActions) {
        this.cardActions = cardActions.reverse();
      }
    });
    this.subscriptions.push(sub);
  }

  private getComments(): void {
    const sub = this.commentsService.getCommentsByCardId(this.cardId).subscribe((comments: IComment[]) => {
      if (!!comments) {
        this.comments = comments;
      }
    });
    this.subscriptions.push(sub);
  }

  private getTodolist(): void {
    const sub = this.todoService.getTodoListById(this.card.TodolistId).subscribe((todolist: ITodoList) => {
      if (!!todolist) {
        this.todoList = todolist;
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
