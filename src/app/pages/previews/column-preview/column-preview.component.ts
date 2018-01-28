import {Component, OnInit, OnDestroy, Input, Output, EventEmitter} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ICard } from '../../../interfaces/ICard.interface';
import { IColumn } from '../../../interfaces/IColumn.interface';
import { ColumnService } from '../../../services/column.service';
import { CardService } from '../../../services/card.service';
import { Column } from '../../../interfaces/implementations/Column';
import { Card } from '../../../interfaces/implementations/Card';
import {ActivatedRoute, Router} from '@angular/router';
import {paths} from '../../../constants';

@Component({
  selector: 'app-column-preview',
  templateUrl: './column-preview.component.html',
  styleUrls: ['./column-preview.component.scss']
})
export class ColumnPreviewComponent implements OnInit, OnDestroy {
  @Input() public columnId: number;
  @Output() onDelete: EventEmitter<IColumn> = new EventEmitter<IColumn>();
  public column: IColumn;
  public cards: ICard[] = [];
  private subscriptions: Subscription[] = [];
  constructor(private columnService: ColumnService,
              private router: Router, private route: ActivatedRoute,
              private cardService: CardService) {
  }

  ngOnInit() {
    this.getColumn();
  }

  public onCardDelete(card: ICard): void {
    this.cardService.deleteCard(card.Id).subscribe((res)=>{
      if (!!res) {
        this.getColumn();
      }
    });
  }

  public addCard(): void {
    const routeSub = this.route.params.subscribe(params => {
      const boardId = +params['id'];
      this.router.navigate([`${paths.board}/${boardId}/${this.columnId}/${paths.createCard}`]);
    });
    this.subscriptions.push(routeSub);
  }

  public deleteColumn(): void {
    const columnSub = this.columnService.deleteColumn(this.columnId).subscribe((res) => {
      if (!!res) {
        this.onDelete.emit(this.column);
      }
    });
    this.subscriptions.push(columnSub);
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
        if (!!cards) {
          this.cards = cards;
        }
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
