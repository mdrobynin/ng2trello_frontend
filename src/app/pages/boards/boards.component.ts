import {Component, OnDestroy, OnInit} from '@angular/core';
import {IBoard} from '../../interfaces/IBoard.interface';
import {Subscription} from 'rxjs/Subscription';
import {BoardService} from '../../services/board.service';
import {Router} from '@angular/router';
import {paths} from '../../constants';
import {Board} from '../../interfaces/implementations/Board';

@Component({
  selector: 'app-boards-container',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit, OnDestroy  {
  public boards: IBoard[] = [];
  private subscriptions: Subscription[] = [];
  constructor(private boardsService: BoardService, private router: Router) { }

  ngOnInit() {
    this.getBoards();
  }

  public redirectToBoardCreation(): void {
    this.router.navigate(['/' + paths.createBoard]);
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
