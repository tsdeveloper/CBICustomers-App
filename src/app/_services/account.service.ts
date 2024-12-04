import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, ReplaySubject, Subject, tap } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Client } from '../_models/client';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  http = inject(HttpClient)
  private currentUserSource = new ReplaySubject<Client>(1);
  currentUser$ = this.currentUserSource.asObservable();
  baseUrl = environment.apiUrl;
  private visibleCancelRegister = new BehaviorSubject<boolean>(true);
  visibleCancelRegister$ = this.visibleCancelRegister.asObservable();

constructor() { }
login(values: any): Observable<Client> {
  let params = new HttpParams();
    params = params.append('useCookies', true);
    return this.http.post<Client>(`${this.baseUrl}/account/login`, values).pipe(
      map((user: Client) => {
        if (user) {
         this.setCurrentUserEdit(user);
         return user;
        }
      })
    )
}

register(model: any): Observable<Client>  {
  return this.http.post<Client>(`${this.baseUrl}/account/register`, model).pipe(
    map((user: Client) => {
      if (user) {
       this.setCurrentUserEdit(user);
       return user;
      }
    })
  )
}


setCurrentUser(user: Client) {
  // user.roles = [];
  // const roles = this.getDecodedToken(user.token).role;
  // Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
  localStorage.setItem('user', JSON.stringify(user));
  this.currentUserSource.next(user);
}

setCurrentUserEdit(user: Client) {
  localStorage.setItem('user', JSON.stringify(user));
  this.currentUserSource.next(user);
}

logout() {
  localStorage.removeItem('user');
  this.currentUserSource.next(null);
}

getDecodedToken(token: string) {
  return JSON.parse(atob(token.split('.')[1]));
}

getClientById(id: string) {
  throw new Error('Method not implemented.');
}

getUserInfo() {
  return this.http.get<Client>(`${this.baseUrl}/account/user-info`).pipe(
    map(user => {
      this.setCurrentUserEdit(user);
      return user;
    })
  )
}

update(model: Client): Observable<Client>  {
  return this.http.put<Client>(`${this.baseUrl}/account/update`, model).pipe(
    map((user: Client) => {
      if (user) {
       this.setCurrentUserEdit(user);
       return user;
      }
    })
  )
}

setVisibleCancelRegister(visible: boolean) {
  this.visibleCancelRegister.next(visible);
}

}
