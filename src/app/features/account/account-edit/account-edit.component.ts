import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { error } from 'console';
import { Router } from 'express';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { TextInputComponent } from 'src/app/_forms/text-input/text-input.component';
import { Client } from 'src/app/_models/client';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-account-edit',
  imports: [
    ReactiveFormsModule,
    TextInputComponent,
    CommonModule
  ],
  templateUrl: './account-edit.component.html',
  styleUrl: './account-edit.component.scss'
})
export class AccountEditComponent implements OnInit {
@Input() client: Client
private fb = inject(FormBuilder);
  private accountService = inject(AccountService);
  private toastrService = inject(ToastrService);
  private router = inject(Router);
  @Output() cancelRegister = new EventEmitter();
  validationErrors: string[] = [];

  registerForm = this.fb.group({
    displayName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor() {
   this.accountService.currentUser$.pipe(take(1)).subscribe(client => this.client == client);

  }
  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    const user: Client = JSON.parse(window.localStorage.getItem('user'));
    if (user) {
      this.accountService.setCurrentUser(user);
      this.client = user;
    }
  }
}
