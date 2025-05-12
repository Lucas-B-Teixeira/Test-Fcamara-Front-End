import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sort-users',
  standalone: false,
  templateUrl: './sort-users.component.html',
  styleUrl: './sort-users.component.scss'
})
export class SortUsersComponent {
  @Output() sortChange = new EventEmitter<{ sortBy: string; sortDir: string }>();

  sortBy = 'name';
  sortDir = 'asc';

  changeSort(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.sortBy = select.value;
    this.emitSort();
  }

  toggleDirection() {
    this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
    this.emitSort();
  }

  private emitSort() {
    this.sortChange.emit({ sortBy: this.sortBy, sortDir: this.sortDir });
  }
}
