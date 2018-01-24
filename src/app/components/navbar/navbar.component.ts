import {Component, OnDestroy, OnInit} from '@angular/core';
import {IUser} from '../../interfaces/IUser.interface';
import {Subscription} from 'rxjs/Subscription';
import {Router} from '@angular/router';
import {UsersService} from '../../services/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  public user: IUser;
  private subscriptions: Subscription[] = [];

  constructor(private userService: UsersService,
              private router: Router) {}

  ngOnInit() {

  }

  private subscribeUser(): void {

  }

  loginAction(): void {

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }
}
