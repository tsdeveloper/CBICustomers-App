import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/_services/account.service';
import { inject } from '@angular/core';
import { catchError, take, tap, throwError } from 'rxjs';
import { Client } from '../_models/client';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Router} from "@angular/router";

export const JwtInterceptor:HttpInterceptorFn = (req, next) => {
  const accountService = inject(AccountService)
  const toastService = inject(ToastrService)
  const router = inject(Router)

    let currentUser: Client;

    accountService.currentUser$.pipe(take(1)).subscribe(user => currentUser = user);

    if (currentUser){
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`
        }
      })
    }

    return next(req);
  }

