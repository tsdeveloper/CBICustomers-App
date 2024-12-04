import { AccountService } from 'src/app/_services/account.service';
import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TextInputComponent } from 'src/app/_forms/text-input/text-input.component';
import { Address } from 'src/app/_models/address';
import { Client } from 'src/app/_models/client';
import { AddressService } from 'src/app/_services/address.service';

@Component({
  selector: 'app-address-edit',
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule,
    TextInputComponent],
  templateUrl: './address-edit.component.html',
  styleUrl: './address-edit.component.scss'
})
export class AddressEditComponent implements OnInit{

  toastrService = inject(ToastrService)
  addressService = inject(AddressService)
  accountService = inject(AccountService)
  activatedRoute = inject(ActivatedRoute)
  router = inject(Router)
  fb = inject(FormBuilder)
  validationErrors: string[] | null = null;
  @Input() address: Address;
  @Input() client: Client;

  registerForm = this.fb.group({
    id: [0, Validators.required],
    name: ['', [Validators.required, Validators.maxLength(200)]],
    clientId: ['1f9bd8a5-11a4-47bf-a855-30ca2843b97b', [Validators.required]],
    zipCode: ['', [Validators.required, Validators.maxLength(8)]],
    city: ['', [Validators.required, Validators.maxLength(150)]],
    state: ['', [Validators.required, Validators.maxLength(2)]],
  });

  ngOnInit() {
   this.loadAddressByUserAuth()
  }
  loadAddressByUserAuth() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) this.addressService.getAddress(+id).subscribe({
      next: (address:Address) => {

        this.address = address;
        this.registerForm.patchValue(this.address)
      },
      error: error => console.log(error)
    })
  }


  update() {
    this.addressService.create(this.registerForm.value).subscribe({
      next: (res) => {
        this.toastrService.success("Endereço cadastrado com sucesso!");
        this.router.navigateByUrl(`/address`);
      },
      error: (err) => {
        console.error('Ocorreu um erro:', err);
        this.validationErrors = err.error.errors;
        this.toastrService.error(err.error.errors);
      }
    });
  }
}
