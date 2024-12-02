import { inject, Injectable } from '@angular/core';
import { map, Observable, ReplaySubject, tap } from 'rxjs';
import { environment } from 'src/enviroments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Client } from '../_models/client';
import { SignalrService } from './sinalr.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  http = inject(HttpClient)
  private signalrService = inject(SignalrService);
  private currentUserSource = new ReplaySubject<Client>(1);
  baseUrl = environment.apiUrl;
  currentUser$ = this.currentUserSource.asObservable();

constructor() { }
login(values: any): Observable<Client> {
  let params = new HttpParams();
    params = params.append('useCookies', true);
    return this.http.post<Client>(`${this.baseUrl}/account/login`, values).pipe(
      map((user: Client) => {
        if (user) {
         this.setCurrentUser(user);
         return user;
        }
      })
    )
}

register(model: any): Observable<Client>  {
  return this.http.post<Client>(`${this.baseUrl}/account/register`, model).pipe(
    map((user: Client) => {
      if (user) {
       this.setCurrentUser(user);
       return user;
      }
    })
  )
}


setCurrentUser(user: Client) {
  user.roles = [];
  // const roles = this.getDecodedToken(user.token).role;
  // Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
  localStorage.setItem('user', JSON.stringify(user));
  this.currentUserSource.next(user);
}

logout() {
  localStorage.removeItem('user');
  this.currentUserSource.next(null);
  // this.presence.stopHubConnection();
}

getDecodedToken(token: string) {
  return JSON.parse(atob(token.split('.')[1]));
}

getClientById(id: string) {
  throw new Error('Method not implemented.');
}

getUserInfo() {
  return this.http.get<Client>(this.baseUrl + 'account/user-info').pipe(
    map(user => {
      this.currentUserSource.next(user);
      return user;
    })
  )
}
}
