import {ITodo} from '../ITodo.interface';

export class Todo implements ITodo {
  Id: number;
  Text: string;
  Status: boolean;

  constructor(text: string) {
    this.Text = text;
    this.Status = false;
  }
}
