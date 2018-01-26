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
    this.cards.push(new Card("example card", 1, 1));
    this.column = new Column("example column", 1);
    //this.getColumn();
  }

  private getColumn(): void {
    const columnSub = this.columnService.getColumnById(this.columnId).subscribe((column: IColumn) => {
      this.column = column;
      if (!!column) {
        //use column ID here
        const cardsSub = this.cardService.getCardsByColumnId(this.columnId).subscribe((cards: ICard[]) => {
          this.cards = cards;
        });
        this.subscriptions.push(cardsSub);
      }
    });
    this.subscriptions.push(columnSub);
  }
  
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }
}