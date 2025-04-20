import { computed, Injectable, Signal, signal } from '@angular/core';
import { Character, ICharacterColumns } from '../models/character.model';
import { toObservable } from '@angular/core/rxjs-interop';

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

  data = signal<number>(0);

  private _filterSignal = signal<{ name: string; status: string }>({ name: '', status: '' });

  // Optional accessor
  filterSignal$ = this._filterSignal;

  // ✅ Observable version for traditional RxJS use
  filter$ = toObservable(this._filterSignal);

  setFilter(value: { name: string; status: string }) {
    this._filterSignal.set(value);
  }

  getFilter() {
    return this._filterSignal();
  }

  // private filterSignal = signal<{ name: string; status: string } | null>(null);
  // filterSignal$ = this.filterSignal;
  // setFilter(value: { name: string; status: string }) {
  //   debugger;
  //   this.filterSignal.set(value);
  // }

  // getFilter() {
  //   return this.filterSignal();
  // }



  // Add/remove toggle logic
  toggleRow(row: Character) {
    this.selectedRows.update((set) => {
      const updated = new Set(set);
      if (updated.has(row)) {
        updated.delete(row);
      } else {
        row.selected = true;
        updated.add(row);
      }
      return updated;
    });
    console.log(this.selectedRows());
  }

  clearSelection() {
    this.selectedRows.set(new Set());
  }

}
