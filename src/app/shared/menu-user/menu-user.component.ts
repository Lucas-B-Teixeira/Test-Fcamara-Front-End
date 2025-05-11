import { Component, Input } from '@angular/core';
import { getInitials } from '../../utils/get-initials.utilts';
import { UserInterface } from '../../core/models/user/user.model';
import { AuthService } from '../../core/auth/service/auth/auth.service';

@Component({
  selector: 'app-menu-user',
  imports: [],
  templateUrl: './menu-user.component.html',
  styleUrl: './menu-user.component.scss'
})
export class MenuUserComponent {
  
  @Input({required: true}) user!: UserInterface;

  constructor(
    private authService: AuthService
  ){}

  getInitials(name: string){
    return getInitials(name)
  }

  logout(){
    this.authService.logout()
  }

}
