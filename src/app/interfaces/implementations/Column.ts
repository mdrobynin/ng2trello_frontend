import { IColumn } from '../IColumn.interface';

export class Column implements IColumn {
  Id: number;
  BoardId: number;
  CardIds: number[];
  Title: string;

  constructor(title: string, boardId: number) {
    this.Title = title;
    this.BoardId = boardId;
    this.CardIds = [];
  }
}
