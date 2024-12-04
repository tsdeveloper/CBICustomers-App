import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { NgxMaskApplierService } from 'ngx-mask/lib/ngx-mask-applier.service';
import { ToastrService } from 'ngx-toastr';
import { TextInputComponent } from 'src/app/_forms/text-input/text-input.component';
import { Address } from 'src/app/_models/address';
import { Client } from 'src/app/_models/client';
import { AddressService } from 'src/app/_services/address.service';

@Component({
  selector: 'app-address-create',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    TextInputComponent,
    NgxMaskPipe,
    NgxMaskDirective,
  ],
  templateUrl: './address-create.component.html',
  styleUrl: './address-create.component.scss',
})
export class AddressCreateComponent implements OnInit {
  toastrService = inject(ToastrService);
  addressService = inject(AddressService);
  router = inject(Router);
  fb = inject(FormBuilder);
  validationErrors: string[] | null = null;
  @Input() addres: Address;
  @Input() client: Client;

  registerForm = this.fb.group({
    id: [0, Validators.required],
    name: ['', [Validators.required, Validators.maxLength(200)]],
    clientId: ['', [Validators.required]],
    zipCode: ['', [Validators.maxLength(9)]],
    city: ['', [Validators.maxLength(150)]],
    state: ['', [Validators.maxLength(2)]],
  });

  ngOnInit() {
    this.loadAddressByUserAuth();
  }
  loadAddressByUserAuth() {
     const userAuth = JSON.parse(localStorage.getItem('user')) as Client;

    this.registerForm.patchValue({
      clientId: userAuth.id,
    });

  }

  register() {
    this.addressService.create(this.registerForm.value).subscribe({
      next: (res) => {
        this.toastrService.success('Endereço cadastrado com sucesso!');
        this.router.navigateByUrl(`/addresses`);
      },
      error: (err) => {
        console.error('Ocorreu um erro:', err);
        this.validationErrors = err.error.errors;
        this.toastrService.error(err.error.errors);
      },
    });
  }
}
