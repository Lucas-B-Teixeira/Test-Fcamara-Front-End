import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { UserInterface } from '../../../../core/models/user/user.model';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastInfo } from '../../../../utils/toast.util';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pop-up-edit',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './pop-up-edit.component.html',
  styleUrl: './pop-up-edit.component.scss'
})
export class PopUpEditComponent implements OnInit, OnDestroy{
  @Input({required: true}) user!: UserInterface;

  @Output() closePopUp = new EventEmitter<null>();
  @Output() saveUpdate = new EventEmitter<UserInterface>();

  destroy$ = new Subject<void>();

  editForm!: FormGroup;

  updateUser!: UserInterface;
  isDifferentUser: boolean = false;

  constructor(
    private formBuilder: FormBuilder,  
  ){}

  ngOnInit(): void {
    this.editFormUser()
    this.setFormForUpdate()
    this.compareUser()
  }

  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();
  }

  editFormUser(): void {
    this.editForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(150)]],
      role: ['', [Validators.required, Validators.pattern(/^(USER|ADMIN)$/)]],
    });
  }

  setFormForUpdate(){
    this.updateUser = this.user;
    this.editForm.patchValue({
      name: this.user.name || '',
      email: this.user.email || '',
      role: this.user.role || '',
    });

    this.editForm.markAllAsTouched();
    Object.keys(this.editForm.controls).forEach(field => {  
      this.editForm.get(field)?.updateValueAndValidity();
    });

    this.editForm.valueChanges
    .pipe(takeUntil(this.destroy$))
    .subscribe(values  => {
      this.updateUser = {
        ...this.updateUser,
        name: values.name,
        email: values.email,
        role: values.role
      };
      this.compareUser()
    });   
  }

  onSave(){
    if(this.editForm.valid) this.saveUpdate.emit(this.updateUser)
    return
  }

  onClosePopUp(){
    this.closePopUp.emit(null)
  }

  compareUser(){
    if(this.updateUser === this.user){
      this.isDifferentUser = false;
    }else{
      this.isDifferentUser = true;
    }
  }
  
  invalidName() {
    if (this.editForm.get('name')?.touched && this.editForm.get('name')?.errors?.['required']) {
      ToastInfo("O Nome é obrigatório!");
    }

    if (this.editForm.get('name')?.touched && this.editForm.get('name')?.errors?.['maxlength']) {
      ToastInfo("O Nome deve conter no máximo 150 caracteres!");
    }

    if (this.editForm.get('name')?.touched && this.editForm.get('name')?.errors?.['minlength']) {
      ToastInfo("O Nome deve conter no mínimo 3 caracteres!");
    }
  }

  invalidEmail() {
    const emailControl = this.editForm.get('email');
    const emailValue = emailControl?.value.replace(/_/g, '');

    if (this.editForm.get('email')?.touched && this.editForm.get('email')?.errors?.['required']) {
      ToastInfo("O Email é obrigatório!");
    }

    if (this.editForm.get('email')?.touched && emailValue.length > 100) {
      ToastInfo("O Email deve conter no máximo 150 caracteres!");
    }

    if (this.editForm.get('email')?.touched && emailValue.length < 10) {
      ToastInfo("Email Inválido!");
    }
  }

  invalidRole() {
    if (this.editForm.get('role')?.touched && this.editForm.get('role')?.errors?.['required']) {
      ToastInfo("O Role é obrigatório!");
    }

    if (this.editForm.get('role')?.touched && this.editForm.get('role')?.errors?.['pattern']) {
      ToastInfo("O Role deve ser somente ADMIN ou USER!");
    }
  }

 
}
