import {Component, OnInit, OnDestroy, Input, Output, EventEmitter} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ICard } from '../../../interfaces/ICard.interface';
import {Router} from '@angular/router';
import {paths} from '../../../constants';

@Component({
  selector: 'app-card-preview',
  templateUrl: './card-preview.component.html',
  styleUrls: ['./card-preview.component.scss']
})
export class CardPreviewComponent implements OnInit, OnDestroy {
  @Input() public card: ICard;
  @Output() public onDelete: EventEmitter<ICard> = new EventEmitter<ICard>();
  private subscriptions: Subscription[] = [];
  constructor(private router: Router) { }

  public deleteHandler(): void {
    this.onDelete.emit(this.card);
  }

  ngOnInit() {
  }

  public redirectToCard(): void {
    this.router.navigate([`/${paths.card}/${this.card.Id}`]);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }
}
