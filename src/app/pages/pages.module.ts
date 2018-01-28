import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared.module';

import { BoardsComponent } from './boards/boards.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { RegisterComponent } from './register/register.component';
import { ErrorComponent } from './error/error.component';
import { ProfileComponent } from './profile/profile.component';
import { TeamsComponent } from './teams/teams.component';
import { BoardPreviewComponent } from './previews/board-preview/board-preview.component';
import { CreateBoardComponent } from './create-board/create-board.component';
import { BoardComponent } from './board/board.component';
import { ColumnPreviewComponent } from './previews/column-preview/column-preview.component';
import { CardPreviewComponent } from './previews/card-preview/card-preview.component';
import {CreateColumnComponent} from './create-column/create-column.component';
import { CreateCardComponent } from './create-card/create-card.component';
import { CardComponent } from './card/card.component';
import { TodolistComponent } from './previews/todolist/todolist.component';
import {TodoComponent} from './previews/todo/todo.component';
import { CommentsComponent } from './previews/comments/comments.component';
import { CommentComponent } from './previews/comment/comment.component';
import { CardActionsComponent } from './previews/card-actions/card-actions.component';
import { CardActionComponent } from './previews/card-action/card-action.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    ErrorComponent,
    BoardsComponent,
    LoginComponent,
    MainComponent,
    RegisterComponent,
    ProfileComponent,
    TeamsComponent,
    BoardPreviewComponent,
    CreateBoardComponent,
    BoardComponent,
    ColumnPreviewComponent,
    CardPreviewComponent,
    CreateColumnComponent,
    CreateCardComponent,
    CardComponent,
    TodolistComponent,
    TodoComponent,
    CommentsComponent,
    CommentComponent,
    CardActionsComponent,
    CardActionComponent
  ],
  exports: [
    ErrorComponent,
    BoardsComponent,
    LoginComponent,
    MainComponent,
    RegisterComponent,
    ProfileComponent,
    TeamsComponent,
    BoardPreviewComponent,
    CreateBoardComponent,
    BoardComponent,
    ColumnPreviewComponent,
    CreateColumnComponent,
    CreateCardComponent,
    CardComponent,
    TodolistComponent,
    TodoComponent
  ],
  entryComponents: [
    CreateColumnComponent,
    CreateBoardComponent,
    CreateCardComponent
  ]
})
export class PagesModule { }
