import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Character, ICharacterColumns, IFilterPayload } from '../models/character.model';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class SelectionService {

  selectedRows = signal<Map<number, Character>>(new Map());

  selectedRowsIDs = computed(() => Array.from(this.selectedRows().keys()));

  // Computed for count
  selectedCount$: Signal<number> = computed(() => this.selectedRows().size);

  // Expose signal getter
  getSelectedRows = () => this.selectedRows();

  // selectedViewSignal$ = signal<string>('grid');
  selectedViewSignal$ = signal<string>('list');

  private _filterSignal = signal<IFilterPayload>({ name: '', status: '' });

  // Optional accessor
  // filterSignal$ = this._filterSignal;

  // ✅ Observable version for traditional RxJS use
  // this is makes a request to character component and provider
  filter$ = toObservable(this._filterSignal);

  setFilter(value: IFilterPayload) {
    this._filterSignal.set(value);
  }

  // getFilter(): IFilterPayload {
  //   return this._filterSignal();
  // }


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
    console.log(this.selectedRows());
  }

  clearSelection() {
    this.selectedRows.set(new Map());
  }

}
