import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BoardsComponent } from './pages/boards/boards.component';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { RegisterComponent } from './pages/register/register.component';
import { ErrorComponent } from './pages/error/error.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {TeamsComponent} from './pages/teams/teams.component';
import {CreateBoardComponent} from './pages/create-board/create-board.component';
import {paths} from './constants';
import {BoardComponent} from './pages/board/board.component';
import {CreateColumnComponent} from './pages/create-column/create-column.component';
import {CreateCardComponent} from './pages/create-card/create-card.component';

const appRoutes: Routes = [
  {
    path: paths.boards,
    component: BoardsComponent
  },
  {
    path: `${paths.board}/:id`,
    component: BoardComponent
  },
  {
    path: paths.profile,
    component: ProfileComponent
  },
  {
    path: paths.login,
    component: LoginComponent
  },
  {
    path: paths.register,
    component: RegisterComponent
  },
  {
    path: paths.teams,
    component: TeamsComponent
  },
  {
    path: paths.main,
    component: MainComponent
  },
  {
    path: '',
    redirectTo: `/${paths.main}`,
    pathMatch: 'full'
  },
  {
    path: '**',
    component: ErrorComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class RoutingModule { }
