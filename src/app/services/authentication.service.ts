import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  pb = new PocketBase(environment.pocketBaseUrl);

  constructor() {}

  async login(email: string, password: string) {
    return await this.pb.collection('users').authWithPassword(email, password);
  }

  logout() {
    this.pb.authStore.clear();
  }

  authenticatedUserId() {
    return this.pb.authStore.model?.id;
  }

  async authRefresh() {
    await this.pb.collection('users').authRefresh();
  }

  isLoggedIn() {
    return this.pb.authStore.isValid;
  }
}
