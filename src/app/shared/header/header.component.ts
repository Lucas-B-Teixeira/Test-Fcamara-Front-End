import { Component, Input } from '@angular/core';
import { UserInterface } from '../../core/models/user/user.model';
import { getInitials } from '../../utils/get-initials.utilts';
import { MenuUserComponent } from "../menu-user/menu-user.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [MenuUserComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  @Input() user!: UserInterface;

  menuUserVisible = false

  changeMenuUserVsible(){
    this.menuUserVisible = !this.menuUserVisible 
  }

  getInitials(name: string){
    return getInitials(name)
  }
}
