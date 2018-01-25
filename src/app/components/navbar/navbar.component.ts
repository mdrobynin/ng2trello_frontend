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
    this.subscribeUser();
  }

  private subscribeUser(): void {
    const sub = this.userService.user.subscribe((user: IUser) => {
      this.user = user;
    });
    this.subscriptions.push(sub);
  }

  public login(): void {

  }

  public logout(): void {
    this.userService.logout();
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }
}
