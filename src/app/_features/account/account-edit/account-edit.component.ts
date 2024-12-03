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
import { Client, ClientEdit } from '../../../_models/client';
import { AccountService } from '../../../_services/account.service';

@Component({
  selector: 'app-account-edit',
  imports: [ReactiveFormsModule, TextInputComponent, CommonModule, FormsModule],
  templateUrl: './account-edit.component.html',
  styleUrl: './account-edit.component.scss',
})
export class AccountEditComponent implements OnInit {
  @Input() client: Client;
  @Input() clientEdit: ClientEdit;
  @Input() address: Address;
  fb = inject(FormBuilder);
  private accountService = inject(AccountService);
  private toastrService = inject(ToastrService);
  validationErrors: string[] = [];
  @Output() cancelRegister = new EventEmitter();

  registerForm = this.fb.group({
    user: this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
    }),
    address: this.fb.group({
      id: [0],
      name: [''],
      clientId: [''],
      city: [''],
      state: [''],
      zipCode: [''],
    }),
  });

  @HostListener('window:beforeunload', ['$event']) unloadNotification(
    $event: any
  ) {
    if (this.registerForm.dirty) {
      $event.returnValue = true;
    }
  }
  constructor() {
    this.accountService.currentClientEdit$.subscribe(
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

    console.log(`edit ${JSON.stringify(this.clientEdit)}`);

    this.registerForm.patchValue({
      user: this.clientEdit,
      address: this.clientEdit.address,
    });
  }

  update() {
    console.log(this.registerForm.value);

    let clientUpdate = this.registerForm.get('user').value as ClientEdit;
    let addresEdit = this.registerForm.get('address').value as AddressEdit;
    if (addresEdit && addresEdit.name) {
      clientUpdate.address = addresEdit;
      clientUpdate.address.clientId = clientUpdate.id;
    }

    this.accountService.update(clientUpdate).subscribe({
      next: (res: ClientEdit) => {
        this.accountService.setCurrentUserEdit(res);
        this.registerForm.patchValue({
          user: res,
          address: res.address,
        });

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
