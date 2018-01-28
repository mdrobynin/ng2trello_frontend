import {Component, OnDestroy, OnInit} from '@angular/core';
import {IBoard} from '../../interfaces/IBoard.interface';
import {Subscription} from 'rxjs/Subscription';
import {BoardService} from '../../services/board.service';
import {Router} from '@angular/router';
import {paths} from '../../constants';
import {Board} from '../../interfaces/implementations/Board';
import {ModalService} from '../../services/modal.service';
import {CreateBoardComponent} from '../create-board/create-board.component';

@Component({
  selector: 'app-boards-container',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit, OnDestroy  {
  public boards: IBoard[] = [];
  private subscriptions: Subscription[] = [];
  constructor(private boardsService: BoardService,
              private modalService: ModalService,
              private router: Router) { }

  ngOnInit() {
    this.getBoards();
    this.listenResults();
  }

  public redirectToBoardCreation(): void {
    this.modalService.showModal(CreateBoardComponent);
  }

  public listenResults(): void {
    const sub = this.modalService.getResult().subscribe((res) => {
      if (res instanceof Board) {
        const board = <Board> res;
        this.addBoard(board);
      }
    });
    this.subscriptions.push(sub);
  }

  public addBoard(board: IBoard): void {
    const sub = this.boardsService.addBoard(board).subscribe(() => {
      this.getBoards();
    });
    this.subscriptions.push(sub);
  }

  public boardDeletedHandler(): void {
    this.getBoards();
  }

  private getBoards(): void {
    const sub = this.boardsService.getAllBoards().subscribe((boards: IBoard[]) => {
      this.boards = boards;
    });
    this.subscriptions.push(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }
}
