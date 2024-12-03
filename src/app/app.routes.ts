import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AccountEditComponent } from './_features/account/account-edit/account-edit.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  { path: 'account/:id', component: AccountEditComponent }, // Route with a parameter

  {path: '**', redirectTo: 'not-found', pathMatch: 'full'},
];
