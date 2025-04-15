import { computed, Injectable, Signal, signal } from '@angular/core';
import { ICharacterColumns } from '../models/character.model';

@Injectable({
  providedIn: 'root'
})
export class SelectionService {

  private selectedRows = signal<Set<ICharacterColumns>>(new Set());

  // Computed for count
  selectedCount$: Signal<number> = computed(() => this.selectedRows().size);

  // Expose signal getter
  getSelectedRows = () => this.selectedRows();

  selectedViewSignal$ = signal<string>('grid'); 

  // Add/remove toggle logic
  toggleRow(row: ICharacterColumns) {
    this.selectedRows.update((set) => {
      const updated = new Set(set);
      if (updated.has(row)) {
        updated.delete(row);
      } else {
        updated.add(row);
      }
      return updated;
    });
  }

  clearSelection() {
    this.selectedRows.set(new Set());
  }

}
