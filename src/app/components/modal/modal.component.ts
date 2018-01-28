import {
  Component, OnInit,
  ViewContainerRef,
  ComponentFactoryResolver,
  ViewChild, OnDestroy, AfterViewInit
} from '@angular/core';
import { ModalService } from '../../services/modal.service';
import {Subscription} from 'rxjs/Subscription';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy, AfterViewInit {

  public isVisible: boolean;
  public component: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
  private subscriptions: Subscription[] = [];

  @ViewChild('placeholder', {read: ViewContainerRef}) viewContainer: ViewContainerRef;
  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private viewContainerRef: ViewContainerRef,
              private  modalService:  ModalService) { }

  ngOnInit() {
    this.getVisibility();
  }

  ngAfterViewInit(): void {
    const sub = this.component.subscribe((component) => {
      if (!!component) {
        this.clearModal();
        this.showModal();
      }
    });
    this.subscriptions.push(sub);
  }

  public hideModal(): void {
    this.modalService.hideModal();
  }
  private getVisibility(): void {
    const visSub = this.modalService.getVisibility().subscribe((isVisible: boolean) => {
      if (isVisible + '' !== 'undefined') {
        this.isVisible = isVisible;
        if (isVisible) {
          this.getComponent();
        }
      }
    });
    this.subscriptions.push(visSub);
  }

  private getComponent(): void {
    const compSub = this.modalService.getComponent().subscribe((component: any) => {
      if (!!component) {
        this.component.next(component);
      }
    });
    this.subscriptions.push(compSub);
  }

  private clearModal(): void {
    if (!!this.viewContainer) {
      this.viewContainer.clear();
    }
  }

  private showModal(): void {
    if (this.isVisible && !!this.component.getValue()) {
      const factory = this.componentFactoryResolver.resolveComponentFactory(this.component.getValue());
      this.viewContainer.createComponent(factory);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }
}
