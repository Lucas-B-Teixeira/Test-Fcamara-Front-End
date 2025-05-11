import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../../../core/data-access/user/user.service';
import { UserInterface } from '../../../../core/models/user/user.model';
import { filter, forkJoin, of, Subject, takeUntil } from 'rxjs';
import { ToastError } from '../../../../utils/toast.util';
import { AddressService } from '../../../../core/data-access/address/address.service';


@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy{

  private destroy$ = new Subject<void>();

  user!: UserInterface;
  numberOfUsers!: number;
  numberOfAddresses!: number;

  constructor(
    private userService: UserService,
    private addressService: AddressService
  ){}

  ngOnInit(): void {
    this.userService.user$
      .pipe(
        filter((user): user is UserInterface => !!user),
        takeUntil(this.destroy$)
      )
      .subscribe(user => {
        this.user = user;

        const address$ = this.addressService.fetchCountAddress();
        const users$ = user.role === 'ADMIN'
          ? this.userService.fetchCountUsers()
          : of(null);

        forkJoin([address$, users$])
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: ([addressCount, userCount]) => {
              this.numberOfAddresses = addressCount;
              if (userCount !== null) {
                this.numberOfUsers = userCount;
              }
            },
            error: () => {
              ToastError('Erro ao consultar dados do dashboard');
            }
          });
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
