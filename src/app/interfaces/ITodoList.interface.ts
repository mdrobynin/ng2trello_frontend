import { ITodo } from './ITodo.interface';

export interface ITodoList {
  Id: number;
  Todos: ITodo[];
  Title: string;
}
