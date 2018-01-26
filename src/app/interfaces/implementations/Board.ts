import { IBoard } from '../IBoard.interface';

export class Board implements IBoard {
  Id: number;
  Title: string;
  ColumnIds: number[];
  CardIds: number[];
  ParticipantIds: number[];

  constructor(title: string) {
    this.Title = title;
    this.ColumnIds = [];
    this.CardIds = [];
    this.ParticipantIds = [];
  }
}
