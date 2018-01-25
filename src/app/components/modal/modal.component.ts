import {
  Component, OnInit,
  ViewContainerRef,
  ComponentFactoryResolver,
  ViewChild, OnDestroy
} from '@angular/core';
import { ModalService } from '../../services/modal.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy  {
  public isVisible: boolean;
  public component: any;
  private subscriptions: Subscription[] = [];

  @ViewChild('componentContainer', {read: ViewContainerRef}) viewContainer: ViewContainerRef;
  constructor(private componentFactoryResolver: ComponentFactoryResolver, private  modalService:  ModalService) { }

  ngOnInit() {
    const visSub = this.modalService.getVisibility().subscribe((isVisible: boolean) => {
      this.isVisible = isVisible;
      this.clearModal();
    });
    const compSub = this.modalService.getComponent().subscribe((component: any) => {
      this.component = component;
      this.showModal();
    });
    this.subscriptions.push(visSub);
    this.subscriptions.push(compSub);
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
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }
}
