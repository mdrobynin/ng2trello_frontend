import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared.module';

import { BoardsComponent } from './boards/boards.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { RegisterComponent } from './register/register.component';
import { ErrorComponent } from './error/error.component';

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
    RegisterComponent
  ],
  exports: [
    ErrorComponent,
    BoardsComponent,
    LoginComponent,
    MainComponent,
    RegisterComponent
  ]
})
export class PagesModule { }
