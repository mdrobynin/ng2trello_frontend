import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';

import { TransportService } from './transport.service';
import { TodoService } from './todo.service';
import { ErrorService } from './error.service';
import { ModalService } from './modal.service';
import { TeamsService } from './teams.service';
import { UsersService } from './users.service';
import { ProgressBarService } from './progress-bar.service';
import { LocalStorageService } from './local-storage.service';
import { BoardService } from './board.service';
import { CommentService } from './comment.service';
import { ColumnService } from './column.service';
import { CardService } from './card.service';

@NgModule({
  imports: [
    SharedModule
  ],
  providers: [
    TransportService,
    TodoService,
    ErrorService,
    ModalService,
    TeamsService,
    UsersService,
    ProgressBarService,
    LocalStorageService,
    BoardService,
    CommentService,
    ColumnService,
    CardService
  ]
})
export class ServicesModule { }
