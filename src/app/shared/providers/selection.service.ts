import { computed, Injectable, Signal, signal } from '@angular/core';
import { Character, ICharacterColumns } from '../models/character.model';

@Injectable({
  providedIn: 'root'
})
export class SelectionService {

  private selectedRows = signal<Set<Character>>(new Set());

  // Computed for count
  selectedCount$: Signal<number> = computed(() => this.selectedRows().size);

  // Expose signal getter
  getSelectedRows = () => this.selectedRows();

  selectedViewSignal$ = signal<string>('grid'); 

  // Add/remove toggle logic
  toggleRow(row: Character) {
    this.selectedRows.update((set) => {
      const updated = new Set(set);
      // debugger;
      if (updated.has(row)) {
        updated.delete(row);
        console.log(updated);
      } else {
        // row = {...row, ...{selected: true}};
        
        updated.add(row);
        console.log(updated);
        // debugger;

      }
      return updated;
    });
  }

  clearSelection() {
    this.selectedRows.set(new Set());
  }

}
