import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared.module';
import { ModalComponent } from './modal/modal.component';
import { SearchComponent } from './search/search.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    ModalComponent,
    SearchComponent,
    NavbarComponent,
    PaginationComponent
  ],
  exports: [
    ModalComponent,
    SearchComponent,
    NavbarComponent,
    PaginationComponent
  ]
})
export class ComponentsModule { }
