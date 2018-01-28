import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {IBoard} from '../../../interfaces/IBoard.interface';
import {BoardService} from '../../../services/board.service';

@Component({
  selector: 'app-board-preview',
  templateUrl: './board-preview.component.html',
  styleUrls: ['./board-preview.component.scss']
})
export class BoardPreviewComponent implements OnInit, OnDestroy  {
  @Input() public board: IBoard;
  @Output() public boardDeleted: EventEmitter<IBoard> = new EventEmitter<IBoard>();

  private subscriptions: Subscription[] = [];
  constructor(private boardsService: BoardService) { }

  ngOnInit() {

  }

  public deleteBoard(): void {
    const sub = this.boardsService.deleteBoard(this.board.Id).subscribe((res) => {
      if (!!res) {
        this.boardDeleted.emit(this.board);
      }
    });
    this.subscriptions.push(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }
}
