import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Address } from '../_models/address';
import { Pagination } from '../_models/Pagination';
import { AddressParams } from '../_models/addressParams';
import { Observable, of, map } from 'rxjs';
import { AccountService } from './account.service';
import { Client } from '../_models/client';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  http = inject(HttpClient)
  accountService = inject(AccountService)
  baseUrl = environment.apiUrl;
  pagination?: Pagination<Address[]>;
  addressParams = new AddressParams();
  addressCache = new Map<string, Pagination<Address[]>>();



  getAddressList(useCache = true): Observable<Pagination<Address[]>> {
    if (!useCache) this.addressCache = new Map();

    if (this.addressCache.size > 0 && useCache) {
      if (this.addressCache.has(Object.values(this.addressParams).join('-'))) {
        this.pagination = this.addressCache.get(
          Object.values(this.addressParams).join('-')
        );
        if (this.pagination) return of(this.pagination);
      }
    }

    let params = new HttpParams();

    const clientAuth = JSON.parse(localStorage.getItem('user')) as Client;

    params = params.append('sort', this.addressParams.sort);
    params = params.append('clientId', clientAuth.id);
    params = params.append('pageIndex', this.addressParams.pageNumber);
    params = params.append('pageSize', this.addressParams.pageSize);

    if (this.addressParams.search)
      params = params.append('search', this.addressParams.search);

    return this.http
      .get<Pagination<Address[]>>(`${this.baseUrl}/address/all`, { params })
      .pipe(
        map((response) => {
          this.addressCache.set(
            Object.values(this.addressParams).join('-'),
            response
          );
          this.pagination = response;
          return response;
        })
      );
  }

  create(values: any) {
    return this.http.post<Address>(`${this.baseUrl}/address`, values).pipe(
      map((address) => {
        console.log(address)
        return address;
      })
    );
  }

  update(value: any) {
    return this.http.put(`${this.baseUrl}/address/editar/`, value);
  }

  delete(value: number) {
    return this.http.delete(`${this.baseUrl}/address/remover/${value}`);
  }

  setAddressParams(params: AddressParams) {
    this.addressParams = params;
  }

  getAddressParams() {
    return this.addressParams;
  }

  getAddress(clientId:string, id: number, useCache: boolean = false) {
    if (useCache) {
      const address = [...this.addressCache.values()].reduce(
        (acc, paginatedResult) => {
          return { ...acc, ...paginatedResult.data.find((x) => x.id === id) };
        },
        {} as Address
      );

      if (Object.keys(address).length !== 0) return of(address);
    }

    return this.http.get<Address>(`${this.baseUrl}/address/details/${clientId}/${id}`);
  }
}
