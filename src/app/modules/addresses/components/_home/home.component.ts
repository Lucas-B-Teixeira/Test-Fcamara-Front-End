import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter, Subject, takeUntil } from 'rxjs';
import { UserService } from '../../../../core/data-access/user/user.service';
import { UserInterface } from '../../../../core/models/user/user.model';
import { AddressInterface } from '../../../../core/models/address/address.model';
import { AddressService } from '../../../../core/data-access/address/address.service';
import { ToastError, ToastSuccess } from '../../../../utils/toast.util';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy{
  private destroy$ = new Subject<void>();

  user!: UserInterface;

  currentPageAdmin = 0;
  pageSizeAdmin = 4;
  totalItemsAdmin = 0;
  addressesAdmin: AddressInterface[] = [];
  totalPagesAdmin = 0;

  currentPageUser = 0;
  pageSizeUser = 4;
  totalItemsUser = 0;
  addressesUser: AddressInterface[] = [];
  totalPagesUser = 0;

  editAddress!: AddressInterface;
  showPopUpEdit: boolean = false;
  showPopUpNew: boolean = false;

  isLoadingAdmin: boolean = false;
  isLoadingUser: boolean = false;

  constructor(
    private addressService: AddressService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.userService.user$
      .pipe(
        filter((user): user is UserInterface => !!user),
        takeUntil(this.destroy$)
      )
      .subscribe(user => {
        this.user = user;
        if(this.user.role == 'ADMIN'){
          this.loadAddressByAdmin()
        }
        this.loadAddressByUser();
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadAddressByUser(sort?: { sortBy: string; sortDir: string }): void {
    this.isLoadingUser = true;
    this.addressService.fetchListAddressByUser(this.currentPageUser, this.pageSizeUser, sort)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.addressesUser = response.content;
          this.totalItemsUser = response.totalElements;
          this.totalPagesUser = response.totalPages; 
          this.isLoadingUser = false;
        },
        error: () => {
          ToastError('Erro ao carregar seus endereços');
          this.isLoadingUser = false;
        }
      });
  }

  loadAddressByAdmin(sort?: { sortBy: string; sortDir: string }): void {
    this.isLoadingAdmin = true;
    this.addressService.fetchListAddresses(this.currentPageAdmin, this.pageSizeAdmin, sort)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.addressesAdmin = response.content;
          this.totalItemsAdmin = response.totalElements;
          this.totalPagesAdmin = response.totalPages;
          this.isLoadingAdmin = false;
        },
        error: () => {
          ToastError('Erro ao carregar endereços');
          this.isLoadingAdmin = false;
        }
      });
  }

  onDeleteAddress(adrress: AddressInterface){
    Swal.fire({
      title: `Você realmente deseja deletar o endereço: ${adrress.zipCode}?`,
      showCancelButton: true,
      confirmButtonText: "Sim",
      denyButtonText: `Não`
    }).then((result) => {
      if (result.isConfirmed) {
          this.addressService.fetchDeleteAddress(adrress.id)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: () => {
              this.addressesUser = this.addressesUser.filter(a => a.id !== adrress.id);
              ToastSuccess('Endereço deletado com sucesso!')
            },
            error: () =>{
              ToastError('Erro ao deletar Endereço!')
            }
          })
        } 
    });
  }

  onAddAddress(address: AddressInterface){
    this.addressesUser.push(address)
  }

  onEditAddress(address: AddressInterface){
    Swal.fire({
        title: `Você realmente deseja editar o endereço: ${address.zipCode}?`,
        showCancelButton: true,
        confirmButtonText: "Sim",
        denyButtonText: `Não`
      }).then((result) => {
        if (result.isConfirmed) {
            this.addressService.fetchEditAddress(address.id, address)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
              next: (adrressResponse: AddressInterface) => {
                if(this.user.role == 'ADMIN'){
                  this.addressesAdmin = this.addressesAdmin.map(a => 
                    a.id === adrressResponse.id ? { ...a, ...adrressResponse } : a
                  );
                }
                this.addressesUser = this.addressesUser.map(a => 
                  a.id === adrressResponse.id ? { ...a, ...adrressResponse } : a
                );
                this.changeShowPopUpEdit()
                ToastSuccess('Endereço editado com sucesso!')
              },
              error: () =>{
                ToastError('Erro ao editar Endereço!')
              }
            })
          } 
      });
  }

  changeEditAddress(address: AddressInterface){
    this.editAddress = address
    this.changeShowPopUpEdit()
  }

  changeShowPopUpEdit(){
    this.showPopUpEdit = !this.showPopUpEdit;
  }

  changeShowPopUpNew(){
    this.showPopUpNew = !this.showPopUpNew;
  }

  handlePageChangeUser(newPage: number): void {
    this.currentPageUser = newPage;
    this.loadAddressByUser();
  }

  handlePageChangeAdmin(newPage: number): void {
    this.currentPageAdmin = newPage;
    this.loadAddressByAdmin();
  }
}
