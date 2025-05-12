import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sort-address',
  standalone: false,
  templateUrl: './sort-address.component.html',
  styleUrl: './sort-address.component.scss'
})
export class SortAddressComponent {
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
