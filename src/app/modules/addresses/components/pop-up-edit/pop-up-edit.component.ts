import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddressService } from '../../../../core/data-access/address/address.service';
import { ToastInfo } from '../../../../utils/toast.util';
import { AddressInterface } from '../../../../core/models/address/address.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-pop-up-edit',
  standalone: false,
  templateUrl: './pop-up-edit.component.html',
  styleUrl: './pop-up-edit.component.scss'
})
export class PopUpEditComponent {
  @Input({required: true}) address!: AddressInterface;

  @Output() closePopUp = new EventEmitter<null>();
  @Output() updateAddress = new EventEmitter<AddressInterface>();

  editAddress!: AddressInterface;
  isDifferentAddress: boolean = false;

  private destroy$ = new Subject<void>();

  formAddress!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private addressService: AddressService
  ){}

  ngOnInit(): void {
    this.formNewAddress()
    this.setFormForUpdate()
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  setFormForUpdate(){
    this.editAddress = this.address;
    this.formAddress.patchValue({
      zipCode: this.address.zipCode || '',
      complement: this.address.complement || '',
      number: this.address.number || '',
    });

    this.formAddress.markAllAsTouched();
    Object.keys(this.formAddress.controls).forEach(field => {  
      this.formAddress.get(field)?.updateValueAndValidity();
    });

    this.formAddress.valueChanges
    .pipe(takeUntil(this.destroy$))
    .subscribe(values  => {
      this.editAddress = {
        ...this.editAddress,
        zipCode: values.zipCode,
        complement: values.complement,
        number: values.number
      };
      this.compareAddress()
    });   
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

  onSave(){
    if(this.formAddress.valid) this.updateAddress.emit(this.editAddress)
    return
  }

  compareAddress(){
    if(this.editAddress === this.address){
      this.isDifferentAddress = false;
    }else{
      this.isDifferentAddress = true;
    }
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

