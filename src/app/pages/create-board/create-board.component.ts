import {Component, OnDestroy, OnInit} from '@angular/core';
import {BoardService} from '../../services/board.service';
import {Subscription} from 'rxjs/Subscription';
import {Router} from '@angular/router';
import {IBoard} from '../../interfaces/IBoard.interface';
import {Board} from '../../interfaces/implementations/Board';

@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.scss']
})
export class CreateBoardComponent implements OnInit, OnDestroy  {
  public boardTitle: string;
  private subscriptions: Subscription[] = [];
  constructor(private boardsService: BoardService, private router: Router) { }

  ngOnInit() {

  }

  public createBoard(): void {
    if (this.boardTitle.length > 0) {
      const board = new Board(this.boardTitle);
      this.boardsService.addBoard(board).subscribe(() => {
        this.router.navigate(['/boards']);
      });
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }
}
