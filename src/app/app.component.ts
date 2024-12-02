import { DOCUMENT,CommonModule, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { environment } from './../enviroments/environment';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
  Injectable,
  PLATFORM_ID,
  afterNextRender,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';
import { Client } from './_models/client';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NavComponent, NgxSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent implements OnInit {
  accountService = inject(AccountService);
  toartService = inject(ToastrService);
  spinner = inject(NgxSpinnerService);
  private readonly platformId = inject(PLATFORM_ID);
  private isBrowser!: boolean


  ngOnInit() {

    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 5000);


  }

  setCurrentUser() {

    // console.log(`${JSON.parse(localStorage.getItem('user'))}`)
    // if (localStorage) {
    //   const user: Client = JSON.parse(localStorage.getItem('user'));
    //   if (user) {
    //     this.accountService.setCurrentUser(user);
    //   }
    // }
  }
}
