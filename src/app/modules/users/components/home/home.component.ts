import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserInterface } from '../../../../core/models/user/user.model';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from '../../../../core/data-access/user/user.service';
import { ToastError, ToastSuccess } from '../../../../utils/toast.util';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy{
  private destroy$ = new Subject<void>();

  currentPage = 0;
  pageSize = 4;
  totalItems = 0;
  users: UserInterface[] = [];
  totalPages = 0;

  editUser!: UserInterface;
  showPopUpEdit: boolean = false;

  isLoading: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.userService.getUser() &&  this.userService.getUser()!.role != 'ADMIN') {
      this.router.navigate(['/home']); 
    }
    this.loadUsers();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadUsers(sort?: { sortBy: string; sortDir: string }): void {
    this.isLoading = true;
    this.userService.fetchUsers(this.currentPage, this.pageSize, sort)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.users = response.content;
          this.totalItems = response.totalElements;
          this.totalPages = response.totalPages;
          this.isLoading = false;
        },
        error: () => {
          this.router.navigate(['/dashbaord']);
          ToastError('Erro ao carregar usuários');
           this.isLoading = false;
        }
      });
  }

  onDeleteUser(user: UserInterface){
    Swal.fire({
      title: `Você realmente deseja deletar o usuário: ${user.name}?`,
      showCancelButton: true,
      confirmButtonText: "Sim",
      denyButtonText: `Não`
    }).then((result) => {
      if (result.isConfirmed) {
         this.userService.fetchDeleteUser(user.id)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: () => {
              this.users = this.users.filter(u => u.id !== user.id);
              ToastSuccess('Usuário deletado com sucesso!')
            },
            error: () =>{
              ToastError('Erro ao deletar usuário!')
            }
          })
        } 
    });
  }

  onEditUser(user: UserInterface){
     Swal.fire({
      title: `Você realmente deseja editar o usuário: ${user.name}?`,
      showCancelButton: true,
      confirmButtonText: "Sim",
      denyButtonText: `Não`
    }).then((result) => {
      if (result.isConfirmed) {
         this.userService.fetchEditUser(user.id, user)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: () => {
              this.users = this.users.map(u => 
                u.id === user.id ? { ...u, ...user } : u
              );
              this.changeShowPopUpEdit()
              ToastSuccess('Usuário editado com sucesso!')
            },
            error: () =>{
              ToastError('Erro ao editar usuário!')
            }
          })
        } 
    });
  }

  changeEditUser(user: UserInterface){
    this.editUser = user;
    this.changeShowPopUpEdit()
  }

  changeShowPopUpEdit(){
    this.showPopUpEdit = !this.showPopUpEdit;
  }

  handlePageChange(newPage: number): void {
    this.currentPage = newPage;
    this.loadUsers();
  }

}
