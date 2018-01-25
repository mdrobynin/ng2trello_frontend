import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared.module';
import { ModalComponent } from './modal/modal.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    ModalComponent,
    NavbarComponent,
    FooterComponent
  ],
  exports: [
    ModalComponent,
    NavbarComponent,
    FooterComponent
  ]
})
export class ComponentsModule { }
