import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {Board} from '../../interfaces/implementations/Board';
import {ModalService} from '../../services/modal.service';

@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.scss']
})
export class CreateBoardComponent implements OnInit, OnDestroy {
  public boardTitle: string;
  private subscriptions: Subscription[] = [];

  constructor(private modalService: ModalService) {
  }

  ngOnInit() {

  }

  public createBoard(): void {
    if (this.boardTitle.length > 0) {
      const board = new Board(this.boardTitle);
      this.modalService.setResult(board);
      this.modalService.hideModal();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }
}
