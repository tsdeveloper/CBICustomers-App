import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, FormGroupName, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TextInputComponent } from 'src/app/_forms/text-input/text-input.component';
import { Address } from 'src/app/_models/address';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-account-address-edit',
  imports: [
    ReactiveFormsModule,
    TextInputComponent,
    CommonModule
  ],
  templateUrl: './account-address-edit.component.html',
  styleUrl: './account-address-edit.component.scss'
})
export class AccountAddressEditComponent implements OnInit {
  @Input() address: Address
  registerForm = inject(FormGroup);
  formGroupName = inject(FormGroupName);


  ngOnInit() {
      this.registerForm.patchValue(this.address);
  }
}
