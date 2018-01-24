export interface ICard {
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
}
