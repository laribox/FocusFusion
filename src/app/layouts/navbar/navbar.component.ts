import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.development';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, AfterViewInit {
  time: string = '';
  title: string = environment.title;
  icon: string = environment.icon;
  date: Date = new Date();
  ngAfterViewInit(): void {}
  ngOnInit(): void {
    const currentDate = new Date();
    this.time = currentDate.toLocaleTimeString();
    setInterval(() => {
      const currentDate = new Date();
      this.time = currentDate.toLocaleTimeString();
    }, 1000);
  }
}
