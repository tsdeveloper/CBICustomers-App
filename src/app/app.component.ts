import { AccountService } from './_services/account.service';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';
import { NavComponent } from './nav/nav.component';
import { Client } from './_models/client';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, NavComponent, NgxSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit  {
  title = 'SampleAppTest';
  spinner = inject(NgxSpinnerService);
  accountService = inject(AccountService);


  ngOnInit() {

    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 5000);

    this.setCurrentUser();
  }

  setCurrentUser() {

    const json = localStorage.getItem('user');
    if (json)
    {
      const user: Client = JSON.parse(json) || null;
      if (user) {
        this.accountService.setCurrentUser(user);
      }
    }


  }
}
