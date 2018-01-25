import {Component, OnDestroy, OnInit} from '@angular/core';
import {IBoard} from '../../interfaces/IBoard.interface';
import {Subscription} from 'rxjs/Subscription';
import {BoardService} from '../../services/board.service';
import {Router} from '@angular/router';
import {paths} from '../../constants';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy  {
  private subscriptions: Subscription[] = [];
  constructor(private boardsService: BoardService, private router: Router) { }

  ngOnInit() {

  }


  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }
}
