export interface IBoard {
  Id: number;
  Title: string;
  ColumnIds: number[];
  CardIds: number[];
  ParticipantIds: number[];
  Status?: 'active' | 'deleted';
  Sorting?: 'asc' | 'desc';
}
