import {ICardAction} from '../ICardAction.interface';

export class CardAction implements ICardAction {
  Id: number;
  CardId: number;
  Text: string;
  ParticipantId: number;

  constructor(text: string, cardId: number, userId: number) {
    this.CardId = cardId;
    this.Text = text;
    this.ParticipantId = userId;
  }
}
