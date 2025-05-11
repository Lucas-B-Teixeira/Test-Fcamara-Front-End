import { Injectable } from '@angular/core';
import { AddressInterface } from '../../models/address/address.model';
import { HttpClient } from '@angular/common/http';
import { AddressRequestInterface } from '../../models/address/address-request.model';
import { Observable } from 'rxjs';
import { PageResponse } from '../../models/page/page-response.model';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  URL_SERVIDOR = 'http://localhost:8080'

  listAddress!: AddressInterface[];

  constructor(private http: HttpClient) { }

  public fetchCreateAddress(address: AddressInterface): Observable<AddressInterface>{
    return this.http.post<AddressInterface>(`${this.URL_SERVIDOR}/api/v1/address`, address, {
      headers: {
        'Authorization': `Bearer ${window.sessionStorage.getItem('access_token')!}`
      }
    })
  }

   public fetchCreateAddressByUserId(userId: string, address: AddressInterface): Observable<AddressInterface>{
    return this.http.post<AddressInterface>(`${this.URL_SERVIDOR}/api/v1/address/user/${userId}`, address, {
      headers: {
        'Authorization': `Bearer ${window.sessionStorage.getItem('access_token')!}`
      }
    })
  }

  public fetchCountAddress(): Observable<number>{
    return this.http.get<number>(`${this.URL_SERVIDOR}/api/v1/address/count`, {
      headers: {
        'Authorization': `Bearer ${window.sessionStorage.getItem('access_token')!}`
      }
    })
  }

  public fetchListAddressByUser(page: number, size: number): Observable<PageResponse<AddressInterface>> {
    return this.http.get<PageResponse<AddressInterface>>(`${this.URL_SERVIDOR}/api/v1/address`, {
      params: {
        page: page.toString(),
        size: size.toString()
      },
      headers: {
        'Authorization': `Bearer ${window.sessionStorage.getItem('access_token')!}`
      }
    })
  }

  public fetchListAddresses(page: number, size: number): Observable<PageResponse<AddressInterface>> {
    return this.http.get<PageResponse<AddressInterface>>(`${this.URL_SERVIDOR}/api/v1/address/all`, {
      params: {
        page: page.toString(),
        size: size.toString()
      },
      headers: {
        'Authorization': `Bearer ${window.sessionStorage.getItem('access_token')!}`
      }
    })
  }

  public fetchEditAddress(id: string, address: AddressInterface): Observable<AddressInterface> {
    return this.http.put<AddressInterface>(`${this.URL_SERVIDOR}/api/v1/address/${id}`, address, {
      headers: {
        'Authorization': `Bearer ${window.sessionStorage.getItem('access_token')!}`
      }
    })
  }
  
  public fetchDeleteAddress(id: string): Observable<void> {
    return this.http.delete<void>(`${this.URL_SERVIDOR}/api/v1/address/${id}`, {
      headers: {
        'Authorization': `Bearer ${window.sessionStorage.getItem('access_token')!}`
      }
    })
  }

  public getAddresses(): AddressInterface[]{
    return this.listAddress;
  }

  public setlistAddress(listAddress: AddressInterface[]): void{
    this.listAddress = listAddress
  }
}
