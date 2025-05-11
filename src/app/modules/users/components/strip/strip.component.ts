import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserInterface } from '../../../../core/models/user/user.model';
import { getInitials } from '../../../../utils/get-initials.utilts';
import { AddressInterface } from '../../../../core/models/address/address.model';

@Component({
  selector: 'app-strip',
  standalone: false,
  templateUrl: './strip.component.html',
  styleUrl: './strip.component.scss'
})
export class StripComponent {
  @Input({required: true}) user!: UserInterface;

  @Output() deleteUser = new EventEmitter<UserInterface>()
  @Output() editUser = new EventEmitter<UserInterface>()

  showPopUpNew: boolean = false;

  onDeleteUser(){
    this.deleteUser.emit(this.user)
  }

  onEditUser(){
    this.editUser.emit(this.user)
  }

  addAddress(){
    this.user.addressCount += 1
  }

  changeShowPopUpNew(){
    this.showPopUpNew = !this.showPopUpNew;
  }

  getInitials(name: string){
    return getInitials(name)
  }
}
