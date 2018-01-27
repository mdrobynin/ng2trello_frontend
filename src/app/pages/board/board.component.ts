import { Component, OnDestroy, OnInit } from '@angular/core';
import { IBoard } from '../../interfaces/IBoard.interface';
import { Board } from '../../interfaces/implementations/Board';
import { Column } from '../../interfaces/implementations/Column';
import { IColumn } from '../../interfaces/IColumn.interface';
import { Subscription } from 'rxjs/Subscription';
import { BoardService } from '../../services/board.service';
import {ActivatedRoute, Router} from '@angular/router';
import { paths } from '../../constants';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy  {
  public board: IBoard;
  private subscriptions: Subscription[] = [];
  private boardId: number;
    constructor(private boardsService: BoardService, private route: ActivatedRoute,
                private router: Router) { }

  ngOnInit() {
    this.getBoard();
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
      console.log(this.board);
    });
    this.subscriptions.push(sub);
  }

  public redirectToColumnCreation(): void {
    this.router.navigate([`${paths.board}/${this.boardId}/${paths.createColumn}`]);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }
}
