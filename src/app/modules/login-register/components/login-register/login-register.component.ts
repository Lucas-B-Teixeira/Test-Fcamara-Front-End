import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ValidatorFn, AbstractControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ResponseToken } from '../../../../core/models/login/response-token.model';
import Swal from 'sweetalert2';
import { ToastInfo, ToastSuccess } from '../../../../utils/toast.util';
import { AuthService } from '../../../../core/auth/service/auth/auth.service';
import { UserService } from '../../../../core/data-access/user/user.service';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrl: './login-register.component.scss',
  standalone: false
})
export class LoginRegisterComponent implements OnInit, OnDestroy{

  private destroy$ = new Subject<void>();

  formLogin!: FormGroup
  formRegister!: FormGroup

  formLoginVisible: boolean = true
  formRegisterVisible: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  
  ngOnInit() {
    window.sessionStorage.clear()
    this.route.url.subscribe(url => {
      if (url.length > 0) {
        const path = url[0].path;
        if (path === 'register') {
          this.formLoginOrRegisterVisible()
        }
      }
    });

    this.newformLogin()
    this.newFormRegister()
  }

  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();
  }

  formLoginOrRegisterVisible(){
    let divBox = <HTMLDivElement> document.querySelector(".container__image")!
    if (this.formLoginVisible) {
      divBox.style.left = '0';
      this.formRegisterVisible = true
      setTimeout(() => {
        this.formLoginVisible = false
        this.formLogin.reset()
      }, 500);
    } else {
      divBox.style.left = '50%';
      this.formLoginVisible = true
      setTimeout(() => {
        this.formRegisterVisible = false
        this.formRegister.reset()
      }, 500);
    }

  }

  newformLogin(): void{
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(150)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50), this.passwordValidator()]]
    })
  }

  newFormRegister(): void{
    this.formRegister = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(150)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50), this.passwordValidator()]],
      passwordCheck: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]]
    })

    this.formRegister.get('passwordCheck')!.setValidators([this.checkPasswordValidator(this.formRegister.get('password')!), Validators.required])

  }

  onLogin(): void{
    window.sessionStorage.clear()
    if(this.formLogin.valid){
      this.authService.login(this.formLogin.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (token: ResponseToken) => {
            window.sessionStorage.setItem('access_token', token.token)
            this.router.navigate(['/home']);
          },
          error: (e) => {
            if(e.status = 401){
              Swal.fire({
                text: 'E-mail ou senha inválida',
                title: `401`,
                icon: 'error'
              });
              return
            }

            Swal.fire({
              text: 'Internal Server Error!',
              title: `500`,
              icon: 'error'
            });
          }
        })
    } else{
      Swal.fire({
        title: "Formulário Inválido!",
        icon: 'error'
      });
    }
  }

  onCreateUser(): void{
    if(this.formRegister.valid){
      this.userService.fetchCreateUser(this.formRegister.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (r) => {
            this.formLoginOrRegisterVisible()
            ToastSuccess('Usuário criado com sucesso!')
          },
          error: (e) => {
            Swal.fire({
              text: e.error.messageCustomError || e.error.message,
              title: `Error code: ${e.error.codeCustomError}.`,
              icon: 'error'
            });
          }
        })
    } else{
      Swal.fire({
        title: "Formulário Inválido!",
        icon: 'error'
      });
    }
  }

  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const senha = control.value;
      const maiuscula = /[A-Z]/.test(senha);
      const minuscula = /[a-z]/.test(senha);
      const num = /\d/.test(senha);
      const caracterEspecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(senha);
      const valido = maiuscula && minuscula && num && caracterEspecial && (senha.length >= 8) && (senha.length <= 20);
      return valido ? null : { invalidPassword: true };
    };
  }

  checkPasswordValidator(senhaControl: AbstractControl): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const senha = senhaControl.value;
      const confSenha = control.value;
      return senha === confSenha ? null : { passwordCheckInvalid: true };
    };
  }

  onPasswordCheckRegister(): void {
    this.formRegister.get('passwordCheck')!.updateValueAndValidity();
  }

  invalidEmailLogin() {
  if (this.formLogin.get('email')?.touched && this.formLogin.get('email')?.errors?.['required']) {
    ToastInfo("O E-mail é obrigatório!");
  }

  if (this.formLogin.get('email')?.touched && this.formLogin.get('email')?.errors?.['maxlength']) {
    ToastInfo("O E-mail deve conter no máximo 150 caracteres!");
  }

  if (this.formLogin.get('email')?.touched && this.formLogin.get('email')?.errors?.['email']) {
    ToastInfo("Deve ser um E-mail válido!");
  }
  }

  invalidPasswordLogin() {
    if (this.formLogin.get('password')?.touched && this.formLogin.get('password')?.errors?.['required']) {
      ToastInfo("A senha é obrigatória!");
    }

    if (this.formLogin.get('password')?.touched && this.formLogin.get('password')?.errors?.['maxlength']) {
      ToastInfo("A senha deve conter no máximo 50 caracteres!");
    }

    if (this.formLogin.get('password')?.touched && this.formLogin.get('password')?.errors?.['minlength']) {
      ToastInfo("A senha deve conter no mínimo 6 caracteres!");
    }

    if (this.formLogin.get('password')?.touched && this.formLogin.get('password')?.hasError('invalidPassword')) {
      ToastInfo("É obrigatório conter ao menos 1 caracter especial em sua senha!\n           !@#$%^&*()_+-=[]{};:'\\|,.<>/?");
    }
  }

  invalidNameRegister() {
    if (this.formRegister.get('name')?.touched && this.formRegister.get('name')?.errors?.['required']) {
      ToastInfo("O Nome é obrigatório!");
    }

    if (this.formRegister.get('name')?.touched && this.formRegister.get('name')?.errors?.['maxlength']) {
      ToastInfo("O Nome deve conter no máximo 150 caracteres!");
    }

    if (this.formRegister.get('name')?.touched && this.formRegister.get('name')?.errors?.['minlength']) {
      ToastInfo("O Nome deve conter no mínimo 3 caracteres!");
    }
  }

  invalidEmailRegister() {
    const emailControl = this.formRegister.get('email');
    const emailValue = emailControl?.value.replace(/_/g, '');

    if (this.formRegister.get('email')?.touched && this.formRegister.get('email')?.errors?.['required']) {
      ToastInfo("O Email é obrigatório!");
    }

    if (this.formRegister.get('email')?.touched && emailValue.length > 100) {
      ToastInfo("O Email deve conter no máximo 150 caracteres!");
    }

    if (this.formRegister.get('email')?.touched && emailValue.length < 10) {
      ToastInfo("Email Inválido!");
    }
  }

  invalidPasswordRegister() {
    if (this.formRegister.get('password')?.touched && this.formRegister.get('password')?.errors?.['required']) {
      ToastInfo("A senha é obrigatória!");
    }

    if (this.formRegister.get('password')?.touched && this.formRegister.get('password')?.errors?.['maxlength']) {
      ToastInfo("A senha deve conter no máximo 50 caracteres!");
    }

    if (this.formRegister.get('password')?.touched && this.formRegister.get('password')?.errors?.['minlength']) {
      ToastInfo("A senha deve conter no mínimo 6 caracteres!");
    }

    if (this.formRegister.get('password')?.touched && this.formRegister.get('password')?.hasError('invalidPassword')) {
      ToastInfo("É obrigatório conter ao menos 1 caracter especial em sua senha!\n           !@#$%^&*()_+-=[]{};:'\\|,.<>/?");
    }
  }

  invalidPasswordCheckRegister() {
    if(this.formRegister.get('passwordCheck')?.touched && this.formRegister.get('passwordCheck')?.hasError('passwordCheckInvalid')){
      ToastInfo("A Confirmação de Senha deve ser idêntica à senha inserida no campo acima!")
    }
  }
}
