import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/enviroments/environment';
import { AccountService } from '../_services/account.service';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  imports: [CommonModule, FormsModule, BsDropdownModule]
})
export class NavComponent implements OnInit {
  model: any = {};
  accountService = inject(AccountService);
  toartService = inject(ToastrService);
  router = inject(Router);
  env = environment.apiUrl;
  loggedIn = false;

  constructor() {}

  ngOnInit() {}

  login() {
    this.accountService.login(this.model).subscribe({
      next: (response) => {
        console.log(response);
        this.loggedIn = true;
      },
      error: error => this.toartService.error(error),
    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
