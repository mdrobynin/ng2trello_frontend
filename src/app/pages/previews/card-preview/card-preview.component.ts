import {Component, OnInit, OnDestroy, Input, Output, EventEmitter} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ICard } from '../../../interfaces/ICard.interface';

@Component({
  selector: 'app-card-preview',
  templateUrl: './card-preview.component.html',
  styleUrls: ['./card-preview.component.scss']
})
export class CardPreviewComponent implements OnInit, OnDestroy {
  @Input() public card: ICard;
  @Output() public onDelete: EventEmitter<ICard> = new EventEmitter<ICard>();
  private subscriptions: Subscription[] = [];
  constructor() { }

  public deleteHandler(): void {
    this.onDelete.emit(this.card);
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }
}
