import {
  Component, OnInit,
  ViewContainerRef,
  ComponentFactoryResolver,
  ViewChild
} from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  public isVisible: boolean;
  public component: any;

  @ViewChild('componentContainer', {read: ViewContainerRef}) viewContainer: ViewContainerRef;
  constructor(private componentFactoryResolver: ComponentFactoryResolver, private  modalService:  ModalService) { }

  ngOnInit() {
    this.modalService.getVisibility().subscribe((isVisible: boolean) => {
      this.isVisible = isVisible;
      this.clearModal();
    });
    this.modalService.getComponent().subscribe((component: any) => {
      this.component = component;
      this.showModal();
    });
  }

  private clearModal(): void {
    this.viewContainer.clear();
  }

  private showModal(): void {
    if (this.isVisible && !!this.component) {
      const factory = this.componentFactoryResolver.resolveComponentFactory(this.component);
      this.viewContainer.createComponent(factory);
    }
  }
}
