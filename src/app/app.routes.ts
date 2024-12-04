import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AccountEditComponent } from './_features/account/account-edit/account-edit.component';
import { authGuard } from './_guards/auth.guard';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  { path: 'account/:id', component: AccountEditComponent },
  {path: 'addresses', loadChildren: () => import('./_features/address/address.routes')
    .then(r => r.addressRoutes)},
  {path: '**', redirectTo: 'not-found', pathMatch: 'full'},
];
