import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  EventEmitter,
  Inject,
  inject,
  Input,
  OnInit,
  Output,
  PLATFORM_ID,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from 'express';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, take } from 'rxjs';
import { TextInputComponent } from 'src/app/_forms/text-input/text-input.component';
import { Client } from 'src/app/_models/client';
import { AccountService } from 'src/app/_services/account.service';
import { AccountAddressEditComponent } from '../account-address-edit/account-address-edit.component';
import { Address } from 'src/app/_models/address';

@Component({
  selector: 'app-account-edit',
  imports: [
    ReactiveFormsModule,
    TextInputComponent,
    CommonModule,
    AccountAddressEditComponent,
  ],
  templateUrl: './account-edit.component.html',
  styleUrl: './account-edit.component.scss',
})
export class AccountEditComponent implements OnInit {
  @Input() client: Client;
  @Input() address: Address;
  private fb = inject(FormBuilder);
  private accountService = inject(AccountService);
  private toastrService = inject(ToastrService);
  @Output() cancelRegister = new EventEmitter();
  validationErrors: string[] = [];

  registerForm = this.fb.group({
    user: this.fb.group({
      id: ['', Validators.required],
      displayName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
    }),
    address: this.fb.group({
      name: [''],
      // clientId: [null],
      // zipCode: [''],
      // city: [''],
      // state: [''],
    }),
  });

  /**
   *
   */
  constructor() {
    if (typeof localStorage !== 'undefined') {
      this.loadMember();
    } else if (typeof sessionStorage !== 'undefined') {
      // Fallback to sessionStorage if localStorage is not supported
      console.log('Web sessionStorage.');
    } else {
      // If neither localStorage nor sessionStorage is supported
      console.log('Web Storage is not supported in this environment.');
    }
  }
  ngOnInit(): void {

  }

  loadMember() {
    const user: Client = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.accountService.setCurrentUser(user);
      this.client = user;

      console.log(`client ${JSON.stringify(this.client)}`);
    this.registerForm.patchValue({
      user:this.client,
      address: this.address,
    });

    this.address = this.client.address;
    }
  }

  update() {
    console.log(this.registerForm.value);
    return;
  }

  getControl(path: string) {
    return this.registerForm.get(path) as FormControl;
  }
}
