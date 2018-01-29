import {Component, OnDestroy, OnInit} from '@angular/core';
import {IBoard} from '../../interfaces/IBoard.interface';
import {Column} from '../../interfaces/implementations/Column';
import {IColumn} from '../../interfaces/IColumn.interface';
import {Subscription} from 'rxjs/Subscription';
import {BoardService} from '../../services/board.service';
import {ActivatedRoute, NavigationEnd, Router, RouterEvent} from '@angular/router';
import {ModalService} from '../../services/modal.service';
import {ColumnService} from '../../services/column.service';
import {CreateColumnComponent} from '../create-column/create-column.component';
import {CardService} from '../../services/card.service';
import { DragulaService } from 'ng2-dragula';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy {
  public board: IBoard;
  private subscriptions: Subscription[] = [];
  private boardId: number;

  constructor(private boardsService: BoardService,
              private columnService: ColumnService,
              private cardService: CardService,
              private route: ActivatedRoute,
              private modalService: ModalService,
              private router: Router,
              private dragulaService: DragulaService) {
    this.subscribeToRouteChange();
  }

  ngOnInit() {
    this.listenResults();
    this.listenDragEvents();
  }

  public refreshColumns(): void {
    this.getBoard();
  }

  public redirectToColumnCreation(): void {
    this.modalService.showModal(CreateColumnComponent);
  }

  private listenResults(): void {
    const sub = this.modalService.getResult().subscribe((res) => {
      if (res instanceof Column) {
        this.addColumn(<IColumn> res);
      }
    });
    this.subscriptions.push(sub);
  }

  private listenDragEvents(): void {
    this.dragulaService.drag.subscribe((value) => {
      console.log("onDrag",value);
    });
    this.dragulaService.drop.subscribe((value) => {
      console.log("onDrop",value);
    });
    this.dragulaService.over.subscribe((value) => {
      console.log("onOver",value);
    });
    this.dragulaService.out.subscribe((value) => {
      console.log("onOut",value);
    });
  }

  private addColumn(column: IColumn): void {
    column.BoardId = this.boardId;
    const sub = this.columnService.addColumn(column).subscribe(() => {
      this.getBoard();
    });
    this.subscriptions.push(sub);
  }

  private subscribeToRouteChange(): void {
    const sub = this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd) {
        this.getBoard();
      }
    });
    this.subscriptions.push(sub);
  }

  private getBoard(): void {
    const routeSub = this.route.params.subscribe(params => {
      this.boardId = +params['id'];
      this.getBoardById();
    });
    this.subscriptions.push(routeSub);
  }

  private getBoardById(): void {
    const sub = this.boardsService.getBoardById(this.boardId).subscribe((board: IBoard) => {
      this.board = board;
    });
    this.subscriptions.push(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }
}
