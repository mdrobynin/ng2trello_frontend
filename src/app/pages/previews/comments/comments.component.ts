import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Comment} from '../../../interfaces/implementations/Comment';
import {Subscription} from 'rxjs/Subscription';
import {CommentService} from '../../../services/comment.service';
import {UsersService} from '../../../services/users.service';
import {IComment} from '../../../interfaces/IComment.interface';
import {ICardAction} from '../../../interfaces/ICardAction.interface';
import {CardActionService} from '../../../services/card-action.service';
import {CardAction} from '../../../interfaces/implementations/CardAction';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit, OnDestroy {
  @Input() public comments: IComment[];
  @Input() public cardId: number;
  @Output() public commentChanged: EventEmitter<IComment> = new EventEmitter<IComment>();
  @Output() public cardActionsChanged: EventEmitter<void> = new EventEmitter<void>();
  public commentText: string;
  private subscriptions: Subscription[] = [];

  constructor(private commentService: CommentService,
              private userService: UsersService,
              private cardActionService: CardActionService) {
  }

  ngOnInit() {
  }

  public addComment(): void {
    if (this.commentText && this.commentText.length > 0) {
      const user = this.userService.getUser();
      const comment = new Comment(this.commentText, user.Id, this.cardId);
      const sub = this.commentService.addComment(comment).subscribe((res) => {
        if (!!res) {
          const text = `Comment ${comment.Text} was added`;
          const cardAction = new CardAction(text, this.cardId, this.userService.getUser().Id);
          this.addCardAction(cardAction);
          this.commentChanged.emit(comment);
          this.commentText = '';
        }
      });
      this.subscriptions.push(sub);
    }
  }

  onDeleteComment(comment: IComment) {
    const sub = this.commentService.deleteComment(comment.Id).subscribe((res) => {
      if (!!res) {
        const text = `Comment ${comment.Text} was deleted`;
        const cardAction = new CardAction(text, this.cardId, this.userService.getUser().Id);
        this.addCardAction(cardAction);
        this.commentChanged.emit(comment);
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
