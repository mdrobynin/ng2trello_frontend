import { ICard } from '../ICard.interface';

export class Card implements ICard {
  Id: number;
  Title: string;
  ParticipantIds: number[];
  BoardId: number;
  CreationTimestamp: number;
  ExpirationTimestamp: number;
  ColumnId: number;
  ActionIds: number[];
  Labels?: string[];
  TodolistId?: number;
  CommentIds?: number[];

  constructor(title: string, boardId: number, columnId: number) {
    this.Title = title;
    this.ParticipantIds = [];
    this.BoardId = boardId;
    this.ColumnId = columnId;
    this.ActionIds = [];
    this.Labels = [];
    this.CommentIds = [];
  }
}
