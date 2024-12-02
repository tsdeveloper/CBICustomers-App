import { HttpClient } from '@angular/common/http';
import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/enviroments/environment';
import { AccountService } from '../_services/account.service';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CommonModule } from '@angular/common';
import { Client } from '../_models/client';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  imports: [CommonModule, FormsModule, BsDropdownModule, RouterModule]
})
export class NavComponent implements OnInit {
  model: any = {};
  accountService = inject(AccountService);
  toartService = inject(ToastrService);
  router = inject(Router);
  env = environment.apiUrl;
  loggedIn = false;
  client: Client;

  constructor() {}

  ngOnInit() {}

  login() {
    this.accountService.login(this.model).subscribe({
      next: (res) => {
        console.log(res);
        this.loggedIn = true;
        this.accountService.setCurrentUser(res);
        this.router.navigateByUrl(`account/${res.id}`);

      },
      error: error => this.toartService.error(error),
    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
