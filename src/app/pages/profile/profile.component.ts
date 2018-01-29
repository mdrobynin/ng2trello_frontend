import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {UsersService} from '../../services/users.service';
import {IUser} from '../../interfaces/IUser.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  public user: IUser;
  private subscriptions: Subscription[] = [];
  constructor(private userService: UsersService) { }

  ngOnInit() {
    this.subscribeUser();
  }

  private subscribeUser(): void {
    const sub = this.userService.user.subscribe((user: IUser) => {
      this.user = user;
    });
    this.subscriptions.push(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }
}
