import {IComment} from '../IComment.interface';

export class Comment implements IComment {
  Id: number;
  UserId: number;
  Text: string;
  CardId: number;

  constructor(text: string, userId: number, cardId: number) {
    this.Text = text;
    this.UserId = userId;
    this.CardId = cardId;
  }
}
