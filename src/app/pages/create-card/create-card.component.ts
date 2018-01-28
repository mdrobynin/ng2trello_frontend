import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {Card} from '../../interfaces/implementations/Card';
import {ModalService} from '../../services/modal.service';

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.scss']
})
export class CreateCardComponent implements OnInit, OnDestroy {
  public cardTitle: string;
  private subscriptions: Subscription[] = [];
  constructor(private modalService: ModalService) { }

  ngOnInit() {
  }

  public createCard(): void {
    if (this.cardTitle.length > 0) {
      const card = new Card(this.cardTitle, 0, 0);
      this.modalService.setResult(card);
      this.modalService.hideModal();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }
}
