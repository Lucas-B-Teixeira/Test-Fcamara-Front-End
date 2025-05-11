import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AddressInterface } from '../../../../core/models/address/address.model';

@Component({
  selector: 'app-strip',
  standalone: false,
  templateUrl: './strip.component.html',
  styleUrl: './strip.component.scss'
})
export class StripComponent {
  @Input({required: true}) address!: AddressInterface;

  @Output() deleteAddress = new EventEmitter<AddressInterface>()
  @Output() editAddress = new EventEmitter<AddressInterface>()

  onDeleteAddress(){
    this.deleteAddress.emit(this.address)
  }

  onEditAddress(){
    this.editAddress.emit(this.address)
  }
}
