import {Component, OnDestroy, OnInit} from '@angular/core';
import {ColumnService} from '../../services/column.service';
import {Subscription} from 'rxjs/Subscription';
import {Column} from '../../interfaces/implementations/Column';
import {ModalService} from '../../services/modal.service';

@Component({
  selector: 'app-create-column',
  templateUrl: './create-column.component.html',
  styleUrls: ['./create-column.component.scss']
})
export class CreateColumnComponent implements OnInit, OnDestroy  {
  public columnTitle: string;
  private boardId: number;
  private subscriptions: Subscription[] = [];
  constructor(private columnService: ColumnService,
              private modalService: ModalService) { }

  ngOnInit() {
  }

  public createColumn(): void {
    if (this.columnTitle.length > 0) {
      const column = new Column(this.columnTitle, this.boardId);
      this.modalService.setResult(column);
      this.modalService.hideModal();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }
}
