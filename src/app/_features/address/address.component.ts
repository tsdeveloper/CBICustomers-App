import { PagingHeaderComponent } from './../../_forms/paging-header/paging-header.component';
import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { AddressItemComponent } from './address-item/address-item.component';
import { Address } from 'src/app/_models/address';
import { AddressParams } from 'src/app/_models/addressParams';
import { PagerComponent } from 'src/app/_forms/pager/pager.component';
import { CommonModule } from '@angular/common';
import { AddressService } from 'src/app/_services/address.service';
import { AddressCreateComponent } from './address-create/address-create.component';
import { AddressEditComponent } from './address-edit/address-edit.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-address',
  imports: [
    CommonModule,
    AddressItemComponent,
    PagerComponent,
    PagingHeaderComponent,
    RouterModule,
  ],
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss',
})
export class AddressComponent {
  errors: string[] | null = null;
  @ViewChild('search') searchTerm?: ElementRef;
  addressList: Address[] = [];
  addressParams: AddressParams;
  sortOptions = [{ name: 'Ordem crescente', value: 'asc' }];
  totalCount = 0;
  @Input() useCache: boolean = true;
  message: string | null = null;
  progress: number | null = 0;
  addressService = inject(AddressService);

constructor() {
  this.addressParams = this.addressService.getAddressParams();


}
  ngOnInit() {
    this.useCache = false;
    this.getAddresss(this.useCache);
  }

  onPageChanged(event: any) {
    const params = this.addressService.getAddressParams();
    if (params.pageNumber !== event) {
      params.pageNumber = event;
      this.addressService.setAddressParams(params);
      this.addressParams = params;
      this.getAddresss();
    }
  }
  getAddresss(useCache: boolean = true) {
    this.addressService.getAddressList(useCache).subscribe({
      next: (response) => {
        this.addressList = response.data;
        this.totalCount = response.count;
      },
      error: (error) => console.log(error),
    });
  }

  onSearch() {
    const params = this.addressService.getAddressParams();
    params.search = this.searchTerm?.nativeElement.value;
    params.pageNumber = 1;
    this.addressService.setAddressParams(params);
    this.addressParams = params;
    this.getAddresss();
  }

  onReset(useCache: boolean = true) {
    if (this.searchTerm) this.searchTerm.nativeElement.value = '';
    this.addressParams = new AddressParams();
    this.addressService.setAddressParams(this.addressParams);
    this.getAddresss(useCache);
  }

  emitEvent(useCache: any) {
    this.useCache = useCache;
  }
}
