import { Component, Input } from '@angular/core';
import { environment } from 'src/environments/environment.development';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  title: string = environment.title;
  icon: string = environment.icon;
}
