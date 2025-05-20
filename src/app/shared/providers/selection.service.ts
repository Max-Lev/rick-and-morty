import { computed, effect, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Character, ICharacterColumns, IFilterPayload, IPagination, PageIndicator } from '../models/character.model';
import { toObservable } from '@angular/core/rxjs-interop';
import { DIALOG_TYPE_ENUM } from '../models/status.enum';
import { EMPTY_FILTER } from '../models/filter.model';
import { BehaviorSubject, Observable } from 'rxjs';

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

  // private _filterSignal = signal<IFilterPayload>({ name: '', status: '' });
  private _filterSignal = signal<IFilterPayload>({...EMPTY_FILTER});

  // ✅ Observable version for traditional RxJS use
  // this is makes a request to character component and provider
  filter$ = toObservable(this._filterSignal);

  // Add getFilterStream method to solve the error
  getFilterStream(): Observable<IFilterPayload> {
    return this.filter$;
  }

  // for filter dialog
  localSearchFiltersPayload$ = signal<IFilterPayload>({ name: '', status: '',gender:'' });

  setFilter(value: IFilterPayload) {
    this._filterSignal.set(value);
  }

  scrollNextPage = signal<IPagination>({ page: 1, nextPage: null, filterPayload: { ...EMPTY_FILTER } });
  scrollNextActive = signal<boolean>(false);
  // activePage = signal<number | null>(1);
  // totalPages = signal<number | null>(null);
  pageIndicator = signal<PageIndicator>({activePage:1,count:null});

  characterIndicator = signal<{loaded:number, count:number}>({loaded:20,count:0});

  viewChangeActive = signal<boolean>(false);
  setScrollNextPage(value: IPagination) {
    this.scrollNextPage.set(value);
  }

  constructor() {

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

  clearSelectedCharacters() {
    this.selectedRows.set(new Map());
  }


  disableFilterNextScroll = signal<boolean>(false);
  getClearFilterBtnState = signal<boolean>(false);
  resetFilters = signal<boolean>(false);
  setClearFilterBtnState(filterFormVals: Partial<IFilterPayload>, dialogType: DIALOG_TYPE_ENUM): boolean {
    const isDirty = this.filterFormRowData(filterFormVals);
    this.getClearFilterBtnState.set(isDirty);
    if (dialogType === DIALOG_TYPE_ENUM.filter) {
      this.disableFilterNextScroll.set(isDirty);
    }
    return isDirty;
  }

  getFilterDialogSubmitBtnState = signal<boolean>(false);
  filterDialogSubmitBtnState(filterFormVals: Partial<IFilterPayload>): boolean {
    const isDirty = this.filterFormRowData(filterFormVals);
    this.getFilterDialogSubmitBtnState.set(isDirty);
    return isDirty;
  }

  filterFormRowData(filterFormVals: Partial<IFilterPayload>) {
    const values = Object.values(filterFormVals);
    const isDirty = values.some(value => value !== '' && value !== null && value !== undefined);
    return isDirty;
  }


}