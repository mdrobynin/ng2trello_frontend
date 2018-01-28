import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {IComment} from '../../../interfaces/IComment.interface';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit, OnDestroy {
  @Input() public comment: IComment;
  @Output() public deleted: EventEmitter<IComment> = new EventEmitter<IComment>();
  private subscriptions: Subscription[] = [];
  constructor() { }

  ngOnInit() {
  }

  public deleteHandler(): void {
    this.deleted.emit(this.comment);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }
}
