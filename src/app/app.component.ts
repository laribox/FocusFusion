import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'FucosFusion';
  currentPath: string = '';
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}
  ngOnInit(): void {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.currentPath = ev.url;
        // console.log(this.currentPath);
      }
    });
  }
  logout() {
    this.authService.logout();
  }
}
