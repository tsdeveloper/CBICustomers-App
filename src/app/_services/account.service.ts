import { inject, Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { environment } from 'src/enviroments/environment';
import { User } from '../_models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  logout() {
    throw new Error('Method not implemented.');
  }
  http = inject(HttpClient)
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

constructor() { }
login(model: any) {
  return this.http.post(`${this.baseUrl}/account/login`, model);
}
}
