import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AddressInterface } from '../../../../core/models/address/address.model';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastError, ToastInfo, ToastSuccess } from '../../../../utils/toast.util';
import { AddressService } from '../../../../core/data-access/address/address.service';
import { Subject, takeUntil } from 'rxjs';
import { UserInterface } from '../../../../core/models/user/user.model';

@Component({
  selector: 'app-pop-up-new',
  imports: [
    CommonModule, 
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './pop-up-new.component.html',
  styleUrl: './pop-up-new.component.scss'
})
export class PopUpNewComponent implements OnInit, OnDestroy{
  @Input() user!: UserInterface;

  @Output() closePopUp = new EventEmitter<null>();
  @Output() newAddress = new EventEmitter<AddressInterface>();

  private destroy$ = new Subject<void>();

  formAddress!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private addressService: AddressService
  ){}

  ngOnInit(): void {
    this.formNewAddress()
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  formNewAddress(): void {
    this.formAddress = this.formBuilder.group({
      zipCode: ['', [ Validators.required, Validators.pattern(/^\d{5}-?\d{3}$/), Validators.maxLength(9)]],
      complement: ['', [Validators.maxLength(150)]],
      number: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    });
  }

  onClosePopUp(){
    this.closePopUp.emit(null)
  }

  onCreate(){
    if(!this.formAddress.valid){
      ToastError('Formulário Inválido!')
      return
    }

    if(this.user){
      this.addressService.fetchCreateAddressByUserId(this.user.id, this.formAddress.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (address: AddressInterface) => {
            this.onClosePopUp()
            this.newAddress.emit(address)
            ToastSuccess('Endereço criado com sucesso!')
          },
          error: () => {
            ToastError('Erro ao criar endereço!')
          }
        })
      return
    }

    this.addressService.fetchCreateAddress(this.formAddress.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (address: AddressInterface) => {
          this.onClosePopUp()
          this.newAddress.emit(address)
          ToastSuccess('Endereço criado com sucesso!')
        },
        error: () => {
          ToastError('Erro ao criar endereço!')
        }
      })
    
  }

  invalidZipCode() {
    const control = this.formAddress.get('zipCode');
    if (control?.touched && control?.errors?.['required']) {
      ToastInfo("O CEP é obrigatório!");
    }
    if (control?.touched && control?.errors?.['pattern']) {
      ToastInfo("O CEP deve estar no formato 12345-678 ou 12345678!");
    }
    if (control?.touched && control?.errors?.['maxlength']) {
      ToastInfo("O CEP deve conter no máximo 9 caracteres!");
    }
  }

  invalidComplement() {
    const control = this.formAddress.get('complement');
    if (control?.touched && control?.errors?.['maxlength']) {
      ToastInfo("O Complemento deve conter no máximo 150 caracteres!");
    }
  }

  invalidNumber() {
    const control = this.formAddress.get('number');
    if (control?.touched && control?.errors?.['required']) {
      ToastInfo("O Número é obrigatório!");
    }
    if (control?.touched && control?.errors?.['pattern']) {
      ToastInfo("O Número deve conter apenas dígitos!");
    }
  }
}
