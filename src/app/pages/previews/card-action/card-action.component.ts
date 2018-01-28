import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ICardAction} from '../../../interfaces/ICardAction.interface';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-card-action',
  templateUrl: './card-action.component.html',
  styleUrls: ['./card-action.component.scss']
})
export class CardActionComponent implements OnInit, OnDestroy {
  @Input() public cardAction: ICardAction;
  private subscriptions: Subscription[] = [];

  constructor() {
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }
}
