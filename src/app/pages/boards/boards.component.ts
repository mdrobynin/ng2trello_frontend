import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { CreateCardComponent } from '../../previews/create-card/create-card.component';

@Component({
  selector: 'app-boards-container',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit {

  constructor(private  modalService:  ModalService) { }

  ngOnInit() {
  }
  public onShowModal(): void {
    this.modalService.showModal(CreateCardComponent);
  }
  public onHideModal(): void {
    this.modalService.hideModal();
  }
}
