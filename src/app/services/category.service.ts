import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';
import { Category } from '../classes/category';
import { AuthenticationService } from './authentication.service';
const pb = new PocketBase('http://localhost:8090');

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private authService: AuthenticationService) {}

  // * get all categories * //

  async getCategories() {
    return await pb
      .collection('categories')
      .getFullList({
        sort: '-created',
        filter: `user_id = "${this.authService.authenticatedUserId()}"`,
      })
      .then((res) =>
        res.map(
          (element) =>
            new Category(
              element.id,
              element['name'],
              element['icon'],
              element['user_id'],
              element['created'],
              element['updated']
            )
        )
      );
  }
  // getCategories(): Observable<Category[]> {
  //   return timer(0, 5000).pipe(
  //     switchMap(() =>
  //       pb
  //         .collection('categories')
  //         .getFullList({
  //           sort: '-created',
  //         })
  //         .then((res) =>
  //           res.map(
  //             (element) =>
  //               new Category(
  //                 element.id,
  //                 element['name'],
  //                 element['icon'],
  //                 element['user_id'],
  //                 element['created'],
  //                 element['updated']
  //               )
  //           )
  //         )
  //     )
  //   );
  // }

  async addCategory(category: Category) {
    category.user_id = this.authService.authenticatedUserId() as string;
    const record = await pb.collection('categories').create(category);
  }

  async updateCategory(RECORD_ID: string, category: Category) {
    await pb.collection('categories').update(RECORD_ID, category);
  }

  async deleteCategory(RECORD_ID: string) {
    return await pb.collection('categories').delete(RECORD_ID);
  }

  // * get category by id * //
  async getCategoryById(RECORD_ID: string) {
    return pb
      .collection('categories')
      .getOne(RECORD_ID, {
        //expand: 'id,name.icon,user_id,created,updated',
      })
      .then((res) => {
        return new Category(
          res.id,
          res['name'],
          res['icon'],
          res['user_id'],
          res['created'],
          res['updated']
        );
      });
  }
}
