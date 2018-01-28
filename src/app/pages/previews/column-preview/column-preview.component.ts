import {Component, OnInit, OnDestroy, Input, Output, EventEmitter} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ICard } from '../../../interfaces/ICard.interface';
import { IColumn } from '../../../interfaces/IColumn.interface';
import { ColumnService } from '../../../services/column.service';
import { CardService } from '../../../services/card.service';
import { Card } from '../../../interfaces/implementations/Card';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalService} from '../../../services/modal.service';
import {CreateCardComponent} from '../../create-card/create-card.component';

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
  private boardId: number;
  private isCurrentColumnOpensModal: boolean;
  private subscriptions: Subscription[] = [];
  constructor(private columnService: ColumnService,
              private modalService: ModalService,
              private router: Router, private route: ActivatedRoute,
              private cardService: CardService) {
  }

  ngOnInit() {
    this.isCurrentColumnOpensModal = false;
    this.listenResults();
    this.getParams();
    this.getColumn();
  }

  public addCardHandler(): void {
    this.isCurrentColumnOpensModal = true;
    this.modalService.showModal(CreateCardComponent);
  }

  public onCardDelete(card: ICard): void {
    const delSub = this.cardService.deleteCard(card.Id).subscribe((res) => {
      if (!!res) {
        this.getCardsByColumnId();
      }
    });
    this.subscriptions.push(delSub);
  }

  public deleteColumn(): void {
    const columnSub = this.columnService.deleteColumn(this.columnId).subscribe((res) => {
      if (!!res) {
        this.onDelete.emit(this.column);
      }
    });
    this.subscriptions.push(columnSub);
  }

  private listenResults(): void {
    const sub = this.modalService.getResult().subscribe((res) => {
      if (res instanceof Card) {
        if (this.isCurrentColumnOpensModal) {
          this.addCard(<ICard> res);
          this.isCurrentColumnOpensModal = false;
        }
      }
    });
    this.subscriptions.push(sub);
  }

  private addCard(card: ICard): void {
    card.BoardId = this.boardId;
    card.ColumnId = this.columnId;
    const sub = this.cardService.addCard(card).subscribe((res) => {
      if (!!res) {
        this.getCardsByColumnId();
      }
    });
    this.subscriptions.push(sub);
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

  private getParams(): void {
    const routeSub = this.route.params.subscribe(params => {
      this.boardId = +params['id'];
    });
    this.subscriptions.push(routeSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }
}
