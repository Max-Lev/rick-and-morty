import { computed, Injectable, Signal, signal } from '@angular/core';
import { Character, ICharacterColumns } from '../models/character.model';

@Injectable({
  providedIn: 'root'
})
export class SelectionService {

   selectedRows = signal<Set<Character>>(new Set());

  // Computed for count
  selectedCount$: Signal<number> = computed(() => this.selectedRows().size);

  // Expose signal getter
  getSelectedRows = () => this.selectedRows();

  selectedViewSignal$ = signal<string>('grid'); 
  // selectedViewSignal$ = signal<string>('list');

  data = signal<number>(0)

  // Add/remove toggle logic
  toggleRow(row: Character) {
    this.selectedRows.update((set) => {
      const updated = new Set(set);
      if(updated.has(row)){
        updated.delete(row);
      }else{
        row.selected = true;
        // row = {...row, selected: true};
        updated.add(row);
      }

      // console.log(updated);
      return updated;
    });
    console.log(this.selectedRows());
  }

  getSelectedData() {
    console.log(this.selectedRows());
    return this.selectedRows;
  }

  clearSelection() {
    this.selectedRows.set(new Set());
  }

}
