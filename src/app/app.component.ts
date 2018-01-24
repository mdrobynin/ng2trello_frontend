import {Component, OnDestroy, OnInit} from '@angular/core';
import {UsersService} from './services/users.service';
import {Subscription} from 'rxjs/Subscription';
import {IUser} from './interfaces/IUser.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  constructor(private usersService: UsersService) {

  }

  ngOnInit(): void {
    this.usersService.getData();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }
}
