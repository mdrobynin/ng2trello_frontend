import { Component, OnDestroy, OnInit } from '@angular/core';
import { IBoard } from '../../interfaces/IBoard.interface';
import { Board } from '../../interfaces/implementations/Board';
import { Column } from '../../interfaces/implementations/Column';
import { IColumn } from '../../interfaces/IColumn.interface';
import { Subscription } from 'rxjs/Subscription';
import { BoardService } from '../../services/board.service';
import { Router } from '@angular/router';
import { paths } from '../../constants';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy  {
  public board: IBoard;
  private subscriptions: Subscription[] = [];
  constructor(private boardsService: BoardService, private router: Router) { }

  ngOnInit() {
    this.board = new Board("example board");
    this.board.ColumnIds = [1,2];
    //this.getBoard();
  }

  private getBoard(): void {
    const boardId = +this.router.url.split('/')[2];
    const sub = this.boardsService.getBoardById(boardId).subscribe((board: IBoard) => {
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
