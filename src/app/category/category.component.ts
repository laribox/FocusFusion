import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent {
  category = new FormControl('');
  longText: string = `The Shiba Inu is the smallest o `;

  constructor() {}

  addCategory() {}

  removeCategory() {}

  editCategory() {}
}
