import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';
import { Client } from '../_models/client';
import { take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService)
  const toastService = inject(ToastrService)
  const router = inject(Router)
  let currentUser: Client;

  accountService.currentUser$.pipe(take(1)).subscribe(user => currentUser = user);
  if (currentUser.token)
    return true;
  else {
    toastService.error("Sessão expirada. Por favor faça login novamente!")
    return router.navigate(["/"]);
  }
};
