import { inject, Injectable } from '@angular/core';
import { AccountService } from './account.service';
import { forkJoin, of, tap } from 'rxjs';
import { Client } from '../_models/client';

@Injectable({
  providedIn: 'root'
})
export class InitService {

  private accountService = inject(AccountService);


  init() {

    return forkJoin({
      user: this.accountService.getUserInfo()
    })

    }
  }

