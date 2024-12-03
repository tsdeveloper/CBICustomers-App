import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, ReplaySubject, Subject, tap } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Client, ClientEdit } from '../_models/client';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  http = inject(HttpClient)
  private currentUserSource = new ReplaySubject<Client>(1);
  private currentClientEditSource = new ReplaySubject<ClientEdit>(1);
  baseUrl = environment.apiUrl;
  currentUser$ = this.currentUserSource.asObservable();
  currentClientEdit$ = this.currentClientEditSource.asObservable();
  private visibleCancelRegister = new BehaviorSubject<boolean>(true);
  visibleCancelRegister$ = this.visibleCancelRegister.asObservable();

constructor() { }
login(values: any): Observable<ClientEdit> {
  let params = new HttpParams();
    params = params.append('useCookies', true);
    return this.http.post<ClientEdit>(`${this.baseUrl}/account/login`, values).pipe(
      map((user: ClientEdit) => {
        if (user) {
         this.setCurrentUserEdit(user);
         return user;
        }
      })
    )
}

register(model: any): Observable<ClientEdit>  {
  return this.http.post<ClientEdit>(`${this.baseUrl}/account/register`, model).pipe(
    map((user: ClientEdit) => {
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

setCurrentUserEdit(user: ClientEdit) {
  // user.roles = [];
  // const roles = this.getDecodedToken(user.token).role;
  // Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
  localStorage.setItem('user', JSON.stringify(user));
  this.currentClientEditSource.next(user);
}

logout() {
  localStorage.removeItem('user');
  this.currentUserSource.next(null);
  this.currentClientEditSource.next(null);
  // this.presence.stopHubConnection();
}

getDecodedToken(token: string) {
  return JSON.parse(atob(token.split('.')[1]));
}

getClientById(id: string) {
  throw new Error('Method not implemented.');
}

getUserInfo() {
  return this.http.get<ClientEdit>(`${this.baseUrl}/account/user-info`).pipe(
    map(user => {
      this.setCurrentUserEdit(user);
      return user;
    })
  )
}

update(model: ClientEdit): Observable<ClientEdit>  {
  return this.http.put<ClientEdit>(`${this.baseUrl}/account/update`, model).pipe(
    map((user: ClientEdit) => {
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
