import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared.module';
import { ModalComponent } from './modal/modal.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    ModalComponent,
    NavbarComponent
  ],
  exports: [
    ModalComponent,
    NavbarComponent
  ]
})
export class ComponentsModule { }
