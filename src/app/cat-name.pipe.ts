import { Pipe, PipeTransform } from '@angular/core';
import { Category } from './classes/category';
import { TasksComponent } from './tasks/tasks.component';

@Pipe({
  name: 'catName',
})
export class CatNamePipe implements PipeTransform {
  categories: Category[] = TasksComponent.categories;
  constructor() {}

  transform(categoryId: string, ...args: unknown[]): string {
    return this.categories.find((category) => category.id === categoryId)!.name;
  }
}
