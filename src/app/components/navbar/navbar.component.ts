import {Component, OnDestroy, OnInit} from '@angular/core';
import { StateService } from '../../services/state.service';
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
  public needRegisration: boolean;
  public actionName: string;
  private subscriptions: Subscription[] = [];
  constructor(private stateService: StateService,
              private userService: UsersService,
              private router: Router) {}

  ngOnInit() {
    this.subscribeUser();
    this.userService.fetchUserDataIfTokenExists();
  }

  private subscribeUser(): void {
    const sub = this.stateService.user().subscribe((user: IUser) => {
      if (user) {
        this.user = user;
        this.actionName = user.Id === -1 ? 'Login' : 'Logout';
        this.needRegisration = user.Id === -1;
      }
    });
    this.subscriptions.push(sub);
  }

  loginAction(): void {
    if (this.needRegisration) {
      this.router.navigate(['/login']);
    } else {
      this.userService.logout();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }
}
