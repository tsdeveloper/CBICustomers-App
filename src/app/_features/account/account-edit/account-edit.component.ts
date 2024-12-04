import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, EventEmitter, HostListener, inject, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TextInputComponent } from '../../../_forms/text-input/text-input.component';
import { Address, AddressEdit } from '../../../_models/address';
import { Client } from '../../../_models/client';
import { AccountService } from '../../../_services/account.service';

@Component({
  selector: 'app-account-edit',
  imports: [ReactiveFormsModule, TextInputComponent, CommonModule, FormsModule],
  templateUrl: './account-edit.component.html',
  styleUrl: './account-edit.component.scss',
})
export class AccountEditComponent implements OnInit {
  @Input() client: Client;
  @Input() clientEdit: Client;
  @Input() address: Address;
  fb = inject(FormBuilder);
  private accountService = inject(AccountService);
  private toastrService = inject(ToastrService);
  validationErrors: string[] = [];
  @Output() cancelRegister = new EventEmitter();

  registerForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
  });

  @HostListener('window:beforeunload', ['$event']) unloadNotification(
    $event: any
  ) {
    if (this.registerForm.dirty) {
      $event.returnValue = true;
    }
  }
  constructor() {
    this.accountService.currentUser$.subscribe(
      (x) => (this.clientEdit = x)
    );
  }

  ngOnInit() {
    this.loadMember();
  }

  loadMember() {
    if (!this.clientEdit) {
      this.accountService.getUserInfo().subscribe({
        next: (res) => {
          if (res) {
            this.clientEdit = res;
          }
        },
        error: (error) => this.toastrService.error(error),
      });
    }
    this.registerForm.patchValue(this.clientEdit);
  }

  update() {
    let clientUpdate = this.registerForm.value as Client;

    this.accountService.update(clientUpdate).subscribe({
      next: (res: Client) => {
        this.accountService.setCurrentUserEdit(res);
        this.registerForm.patchValue(res);

        this.accountService.setVisibleCancelRegister(true);
        this.toastrService.success('Perfil Atualizado com Sucesso.');
      },
      error: (err) => {
        console.error('Ocorreu um erro:', err);
        this.validationErrors = err.error.errors;
        this.toastrService.error(err.error.errors);
      },
    });
  }

  getControl(path: string) {
    return this.registerForm.get(path) as FormControl;
  }
}
