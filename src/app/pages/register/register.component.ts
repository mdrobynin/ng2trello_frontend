import {Component, OnDestroy, OnInit} from '@angular/core';
import { UsersService } from '../../services/users.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {IStatusResponse} from '../../interfaces/IStatusResponse.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy  {
  public username: string;
  public password: string;
  public password1: string;
  public passwordsAreEqual: boolean;

  private subscriptions: Subscription[] = [];

  constructor(private router: Router,
              private usersService: UsersService) { }

  performRegister(): void {
    this.passwordsAreEqual = this.password === this.password1;
    if (this.passwordsAreEqual) {
      this.usersService.register(this.username, this.password).subscribe((res: IStatusResponse) => {
        if (res && res.Status) {
          this.usersService.getData();
        }
      });
    }
  }

  redirectToLogin(): void {
    this.router.navigate(['/login']);
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }
}
