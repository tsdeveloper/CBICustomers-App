import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment.development';
import { Client, ClientEdit } from '../_models/client';
import { AccountService } from '../_services/account.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-nav',
  imports: [CommonModule, FormsModule, BsDropdownModule, RouterModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  model: any = {};
  accountService = inject(AccountService);
  toartService = inject(ToastrService);
  router = inject(Router);
  env = environment.apiUrl;
  loggedIn = false;
  @Input() client: Client;
  @Input() clientEdit: ClientEdit;
  @Output() cancelRegister = new EventEmitter();


  login() {
    this.accountService.login(this.model).subscribe({
      next: (res) => {
        this.loggedIn = true;
        // const client:ClientEdit = { id: "1", name: "Honda" };
        this.accountService.setCurrentUserEdit(res);
        this.accountService.setVisibleCancelRegister(false);
        // this.router.navigate(['/account'], {queryParams: {id: res.id }});
        this.router.navigateByUrl(`/account/${res.id}`);

      },
      error: error => this.toartService.error(error),
    });
  }

  logout() {
    this.accountService.setVisibleCancelRegister(true);
    this.accountService.logout();
    this.router.navigate(['/']);
  }


}
