import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Character, ICharacterColumns, IFilterPayload } from '../models/character.model';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class SelectionService {

  // selectedRows = signal<Set<Character>>(new Set());
  selectedRows = signal<Map<number,Character>>(new Map());

  // Computed for count
  selectedCount$: Signal<number> = computed(() => this.selectedRows().size);

  // Expose signal getter
  getSelectedRows = () => this.selectedRows();

  // selectedViewSignal$ = signal<string>('grid');
  selectedViewSignal$ = signal<string>('list');

  private _filterSignal = signal<IFilterPayload>({ name: '', status: '' });

  // Optional accessor
  filterSignal$ = this._filterSignal;

  // ✅ Observable version for traditional RxJS use
  filter$ = toObservable(this._filterSignal);

  setFilter(value: IFilterPayload) {
    this._filterSignal.set(value);
  }

  getFilter(): IFilterPayload {
    return this._filterSignal();
  }


  toggleRow(row: Character) {
    this.selectedRows.update((prevMap) => {
      const newMap = new Map(prevMap); // 🔁 new reference
  
      if (newMap.has(+row.id)) {
        row.selected = false;
        newMap.delete(+row.id);
      } else {
        row.selected = true;
        newMap.set(+row.id, row);
      }
  
      return newMap; // ✅ signals detect change
    });
  
  }



  clearSelection() {
    this.selectedRows.set(new Map());
  }

}
