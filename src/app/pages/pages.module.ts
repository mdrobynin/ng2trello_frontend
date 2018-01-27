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
    CreateColumnComponent
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
    CreateColumnComponent
  ]
})
export class PagesModule { }
