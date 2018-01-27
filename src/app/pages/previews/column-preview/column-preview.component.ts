import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ICard } from '../../../interfaces/ICard.interface';
import { IColumn } from '../../../interfaces/IColumn.interface';
import { ColumnService } from '../../../services/column.service';
import { CardService } from '../../../services/card.service';
import { Column } from '../../../interfaces/implementations/Column';
import { Card } from '../../../interfaces/implementations/Card';

@Component({
  selector: 'app-column-preview',
  templateUrl: './column-preview.component.html',
  styleUrls: ['./column-preview.component.scss']
})
export class ColumnPreviewComponent implements OnInit, OnDestroy {
  @Input() public columnId: number;
  public column: IColumn;
  public cards: ICard[] = [];
  private subscriptions: Subscription[] = [];
  constructor(private columnService: ColumnService, private cardService: CardService) { }

  ngOnInit() {
    console.log(this.columnId);
    this.getColumn();
  }

  private getColumn(): void {
    const columnSub = this.columnService.getColumnById(this.columnId).subscribe((column: IColumn) => {
      this.column = column;
      this.getCardsByColumnId();
    });
    this.subscriptions.push(columnSub);
  }

  private getCardsByColumnId(): void {
    if (!!this.column) {
      const cardsSub = this.cardService.getCardsByColumnId(this.columnId).subscribe((cards: ICard[]) => {
        this.cards = cards;
      });
      this.subscriptions.push(cardsSub);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }
}
