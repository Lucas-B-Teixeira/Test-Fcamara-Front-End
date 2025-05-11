import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-card-all-address',
  imports: [RouterModule],
  templateUrl: './card-all-address.component.html',
  styleUrl: './card-all-address.component.scss'
})
export class CardAllAddressComponent {
  @Input({required: true}) numberOfAddresses!: number;
}
