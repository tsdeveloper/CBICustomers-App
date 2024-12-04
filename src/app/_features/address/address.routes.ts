import { Route, Routes } from '@angular/router';
import { AddressComponent } from './address.component';
import { AddressEditComponent } from './address-edit/address-edit.component';
import { AddressCreateComponent } from './address-create/address-create.component';

export const addressRoutes: Route[] = [
  {path: '', component: AddressComponent},
  {path: 'create', component: AddressCreateComponent},
  {path: ':id', component: AddressEditComponent},
]
