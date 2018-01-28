import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterEvent} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {Column} from '../../interfaces/implementations/Column';
import {paths} from '../../constants';
import {Card} from '../../interfaces/implementations/Card';
import {CardService} from '../../services/card.service';

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.scss']
})
export class CreateCardComponent implements OnInit, OnDestroy {
  public cardTitle: string;
  private subscriptions: Subscription[] = [];
  private boardId: number;
  private columnId: number;
  constructor(private router: Router, private route: ActivatedRoute, private cardService: CardService) { }

  ngOnInit() {
    this.getParams();
  }

  public createCard(): void {
    if (this.cardTitle.length > 0) {
      this.addCard();
    }
  }

  private addCard(): void {
    const card = new Card(this.cardTitle, this.boardId, this.columnId);
    this.cardService.addCard(card).subscribe(() => {
      this.redirectToBoard();
    });
  }

  private redirectToBoard(): void {
    this.router.navigate([`${paths.board}/${this.boardId}`]);
  }

  private getParams(): void {
    const routeSub = this.route.params.subscribe(params => {
      this.boardId = +params['id'];
      this.columnId = +params['columnid'];
    });
    this.subscriptions.push(routeSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }
}
