import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Address } from 'src/app/_models/address';
import { AccountService } from 'src/app/_services/account.service';
import { AddressService } from 'src/app/_services/address.service';

@Component({
  selector: 'app-address-item',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './address-item.component.html',
  styleUrl: './address-item.component.scss',
})
export class AddressItemComponent {
  @Input() addressList: Address[] = [];
  @Output() resetFormSubject: EventEmitter<any> = new EventEmitter<any>();
  router = inject(Router)
  toastrService = inject(ToastrService)
  addressService = inject(AddressService)


  remover(id: number) {
    this.addressService.delete(id).subscribe({
      next: () => {
        this.toastrService.success('Endereço deletado com sucesso!');

        this.resetFormSubject.emit(false);
      },
      error: (error) => {
        console.log(error.error.message);
        this.toastrService.error(error.error.message);
      },
    });
  }
}
