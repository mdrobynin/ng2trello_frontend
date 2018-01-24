import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';

import { TransportService } from './transport.service';
import { TodoService } from './todo.service';
import { ErrorService } from './error.service';
import { ModalService } from './modal.service';
import { TeamsService } from './teams.service';
import { UsersService } from './users.service';
import { ProgressBarService } from './progress-bar.service';

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
    ProgressBarService
  ]
})
export class ServicesModule { }
