import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-card-all-users',
  imports: [RouterModule],
  templateUrl: './card-all-users.component.html',
  styleUrl: './card-all-users.component.scss'
})
export class CardAllUsersComponent {
  @Input({required: true}) numberOfUsers!: number;
}
