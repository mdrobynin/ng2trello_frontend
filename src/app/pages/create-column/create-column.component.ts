import {Component, OnDestroy, OnInit} from '@angular/core';
import {ColumnService} from '../../services/column.service';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Router} from '@angular/router';
import {IColumn} from '../../interfaces/IColumn.interface';
import {Column} from '../../interfaces/implementations/Column';
import {IBoard} from '../../interfaces/IBoard.interface';
import {paths} from '../../constants';

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
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {

  }

  public createColumn(): void {
    if (this.columnTitle.length > 0) {
      const routeSub = this.route.params.subscribe(params => {
        this.boardId = +params['id'];
        this.addColumn();
      });
      this.subscriptions.push(routeSub);
    }
  }

  private addColumn(): void {
    const column = new Column(this.columnTitle, this.boardId);
    this.columnService.addColumn(column).subscribe(() => {
      this.redirectToBoard();
    });
  }

  private redirectToBoard(): void {
    this.router.navigate([`${paths.board}/${this.boardId}`]);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }
}
