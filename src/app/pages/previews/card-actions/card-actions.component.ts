import {Component, Input, OnInit} from '@angular/core';
import {ICardAction} from '../../../interfaces/ICardAction.interface';

@Component({
  selector: 'app-card-actions',
  templateUrl: './card-actions.component.html',
  styleUrls: ['./card-actions.component.scss']
})
export class CardActionsComponent implements OnInit {
  @Input() public cardActions: ICardAction;
  constructor() { }

  ngOnInit() {
  }
}
