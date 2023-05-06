import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Category } from '../classes/category';
import { MatDialog } from '@angular/material/dialog';
import { IconsDialogComponent } from './icons-dialog/icons-dialog.component';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  categoryInput = new FormControl('');
  iconsPath: string = 'assets/img/icons/';
  SelectedIcon: string = 'clipboard.png';
  categories: Category[] = [];
  submitButtonValue: string = 'add circle outline icon';
  editId: string = '';
  hidden: string = 'hidden';

  constructor(
    public dialog: MatDialog,
    private categoryService: CategoryService
  ) {}
  ngOnInit(): void {
    this.getCategories();
    this.submitButtonValue = 'add circle outline icon';
    // this.categoryService.getCategoryById('46q2eplpk4j8u9t').then((data) => {
    //   console.log(data);
    // });
  }
  changeSubmitState(id: string) {
    if (this.submitButtonValue == 'add circle outline icon') {
      this.submitButtonValue = 'edit';
      this.editId = id;
      this.SelectedIcon = this.categories.find((c) => c.id == id)!.icon;
      this.categoryInput.setValue(
        this.categories.find((c) => c.id == id)!.name
      );
      this.hidden = '';
    } else {
      this.submitButtonValue = 'add circle outline icon';
    }
  }
  buttonSubmit() {
    if (this.submitButtonValue == 'add circle outline icon') {
      this.addCategory();
    } else {
      this.updateCategory(
        this.editId.toString(),
        this.categoryInput.value?.toString()!,
        this.SelectedIcon
      );
      this.submitButtonValue = 'add circle outline icon';
      this.categoryInput.setValue('');
      this.editId = '';
      this.SelectedIcon = 'clipboard.png';
      this.hidden = 'hidden';
    }
  }
  //  * Get all categories
  getCategories() {
    // this.categoryService.getCategories().subscribe((data) => {
    //   this.categories = data;
    // });

    this.categoryService.getCategories().then((data) => {
      this.categories = data;
      // console.log(data);
    });
  }
  //  * Add new category
  addCategory() {
    let category = new Category(
      '',
      this.categoryInput.value?.toString()!,
      this.SelectedIcon,
      ''
    );
    this.categoryService.addCategory(category);
    this.categories.push(category);
    this.categoryInput.setValue('');
    this.SelectedIcon = 'clipboard.png';
  }
  //  * Remove category
  removeCategory(id: string) {
    //delete this.categories[id];
    this.categoryService.deleteCategory(id).then((data) => {
      console.log(data);
      let index = this.categories.findIndex((c) => c.id == id)!;
      this.categories.splice(index, 1);
    });
  }
  //  * Update category
  updateCategory(id: string, name: string, icon: string) {
    this.categories.find((c) => c.id == id)!.name = name;
    this.categories.find((c) => c.id == id)!.icon = icon;
    this.categoryService.updateCategory(
      id,
      this.categories.find((c) => c.id == id)!
    );
  }
  //  * Open icons modal
  openIconsDialog() {
    console.log('openIconsModal');
    const dialogRef = this.dialog.open(IconsDialogComponent, {
      data: '',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.SelectedIcon = result;
    });
  }
}
