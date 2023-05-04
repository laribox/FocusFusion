import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}
  login() {
    this.authService
      .login(this.email, this.password)
      .then((res) => {
        console.log(res);
        console.log(this.authService.isLoggedIn());
        if (this.authService.isLoggedIn()) {
          this.router.navigate(['/']);
        } else {
          this._snackBar.open('Invalid Credentials', 'close');
        }
      })
      .catch((err) => console.log(err));
  }
}
