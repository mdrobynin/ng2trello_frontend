import {Component, OnDestroy, OnInit} from '@angular/core';
import { UsersService } from '../../services/users.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {IStatusResponse} from '../../interfaces/IStatusResponse.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public username: string;
  public password: string;

  private subscriptions: Subscription[] = [];

  constructor(private router: Router,
              private usersService: UsersService) { }

  performLogin(): void {
    this.usersService.login(this.username, this.password).subscribe((res: IStatusResponse) => {
      if (res && res.Status) {
        this.usersService.getData();
      }
    });
  }

  ngOnInit() {
    this.usersService.user.subscribe(console.log);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }
}
