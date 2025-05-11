import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../../../core/data-access/user/user.service';
import { UserInterface } from '../../../../core/models/user/user.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy{

  private destroy$ = new Subject<void>();

  user!: UserInterface | null;

  constructor(
    private userService: UserService
  ){}

  ngOnInit(): void {
    this.userService.fetchCurrentUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe((user: UserInterface) => {
        this.userService.setUser(user)
        this.user = user;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
