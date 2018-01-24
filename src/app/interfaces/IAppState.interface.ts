import { IBoard } from './IBoard.interface';
import { ICard } from './ICard.interface';
import { IColumn } from './IColumn.interface';
import { IComment } from './IComment.interface';
import { IContent } from './IContent.interface';
import { ITeam } from './ITeam.interface';
import { ITodoList } from './ITodoList.interface';
import { IUser } from './IUser.interface';
import { ICardAction } from './ICardAction.interface';

export interface IAppState {
  user?: IUser;
  boards?: IBoard[];
  cards?: ICard[];
  columns?: IColumn[];
  comments?: IComment[];
  contents?: IContent[];
  teams?: ITeam[];
  todolists?: ITodoList[];
  cardActions?: ICardAction[];
}
