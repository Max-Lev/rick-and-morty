import {
  Component, ViewChild, signal, computed, effect, inject, ChangeDetectionStrategy,
  ChangeDetectorRef, OnInit, Input, AfterViewInit,
  ElementRef
} from '@angular/core';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { CharactersService } from '../../../core/providers/characters.service';
import { COLUMNS } from './columns.config';
import { Character, ColumnConfig, ICharacterColumns, ICharactersResponse, IFilterPayload, IPagination } from '../../models/character.model';
import { SelectionService } from '../../providers/selection.service';
import { debounceTime, distinctUntilChanged, shareReplay, switchMap, tap } from 'rxjs/operators';
import { GridViewComponent } from '../../components/grid-view/grid-view.component';
import { ListViewComponent } from '../../components/list-view/list-view.component';
import { LayoutSelectionService } from '../../providers/layout-selection.service';
import { NgClass, ViewportScroller } from '@angular/common';
import { EMPTY_FILTER } from '../../models/filter.model';
import { _ } from '@angular/cdk/number-property.d-1067cb21';
@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [
    ScrollingModule, ListViewComponent,
    GridViewComponent, NgClass],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharactersComponent implements OnInit, AfterViewInit {
  @ViewChild(CdkVirtualScrollViewport) viewport!: CdkVirtualScrollViewport;
  @Input() charactersResolver!: ICharactersResponse;

  // Services
  charactersService = inject(CharactersService);
  selectionService = inject(SelectionService);
  cdr = inject(ChangeDetectorRef);
  layoutSelectionService = inject(LayoutSelectionService);

  lastScrollOffset = 0;

  // State signals
  characters = signal<Character[]>([]);
  isLoading = signal(false);
  // DYNAMIC SCROLL HIGHT
  itemSize = signal<number>(150);
  pagination = signal<IPagination>({ page: 1, nextPage: null, filterPayload: { ...EMPTY_FILTER } });
  prevFilter = signal<IFilterPayload>({ ...EMPTY_FILTER });
  readonly allCharacters = signal<Character[]>([]);
  gridScrollState = signal<number>(0);

  // Columns def
  columns: ColumnConfig<ICharacterColumns>[] = COLUMNS;
  displayedColumns = computed(() => this.columns.map(c => c.columnDef));

  // Computed values
  //INITIAL VIEW LOAD CONFIG
  selectedViewSignal$ = this.selectionService.selectedViewSignal$;
  readonly currentPageSignal$ = computed(() => this.pagination().page);
  layout = computed(() => this.layoutSelectionService.getLayoutType());
  isScrollActive = this.selectionService.scrollNextActive;
  /**
 * search live hitting and no api search
 */
  readonly filteredCharacters = computed(() => {
    const { name, status, gender } = this.selectionService.localSearchFiltersPayload$();
    const keys = Object.keys(this.selectionService.localSearchFiltersPayload$());

    const _allCharacters = this.allCharacters().filter(character => {
      const matchName = !name || character.name.toLowerCase().includes(name.toLowerCase());
      const matchStatus = !status || character.status.toLowerCase() === status.toLowerCase();
      const matchGender = !gender || character.gender.toLowerCase() === gender.toLowerCase();
      return matchName && matchStatus && matchGender;
    });

    console.log('_allCharacters: ', _allCharacters.length, _allCharacters);
    console.log('filtered characters: ', this.allCharacters().length);
    return _allCharacters;
  });


  constructor() {

    this.setFilteredCharactersHandler();

    effect(() => {

      const { page, nextPage, count } = this.pagination();
      // if (nextPage === null) {
      //   // this.selectionService.activePage.set(nextPage);
      //   this.selectionService.pageIndicator.set({ activePage: page, count: count });
      // } else {
      //   // this.selectionService.activePage.set(page);
      //   this.selectionService.pageIndicator.set({ activePage: page, count: count });
      // }

      if (this.isScrollActive()) {
        // console.log(this.selectionService.characterIndicator());
        // const { loaded, count } = this.selectionService.characterIndicator();
        if (this.selectedViewSignal$() === 'list') {
          this.viewport.scrollToIndex(page, 'smooth');
          // this.viewport.scrollToIndex(this.p, 'smooth');
        }
        else {
          const gridIndex = this.gridScrollState();
          if (page !== 1) {
            //grid
            this.viewport.scrollToIndex(page * 20, 'smooth');
            // this.viewport.scrollToIndex(this.p, 'smooth');
          } else {
            //list
            this.viewport.scrollToIndex(gridIndex + 20, 'smooth');
          }
        }
        // reset so effect will be active
        this.selectionService.scrollNextActive.update((v) => false);
      }

    });


  }

  ngOnInit(): void {
    this.initializeData();
    this.charactersResponse$.pipe().subscribe();
  }

  ngAfterViewInit() {


  }

  setFilteredCharactersHandler() {
    effect(() => {
      // console.log('filtered getClearFilterBtnState: ', this.selectionService.getClearFilterBtnState());
      //   console.log('filtered disableFilterNextScroll: ', this.selectionService.disableFilterNextScroll());
      if (this.selectionService.getClearFilterBtnState()) {
        const filtered = this.filteredCharacters();
        this.selectionService.filteredCount.set(filtered.length);
        // console.log('filtered: ', filtered);
        // console.log('filtered getClearFilterBtnState: ', this.selectionService.getClearFilterBtnState());
        // console.log('filtered disableFilterNextScroll: ', this.selectionService.disableFilterNextScroll());
        this.characters.set(filtered);
      }else{
        this.characters.set(this.allCharacters());
      }
    });
  }

  onScroll(index: number): void {

    const disableScroll = this.selectionService.disableFilterNextScroll();
    if (disableScroll) return;

    const isLoaded = this.isLoading();

    if (!isLoaded) {

      const { page, nextPage } = this.pagination();

      const viewportSize = this.getViewportSize();

      const currentView = this.selectedViewSignal$();

      if (currentView === 'grid') {
        this.gridScrollState.set(index);
      }
      if (nextPage && index > 0 && nextPage > page) {

        if (!viewportSize) return;
        const { end, total } = viewportSize;
        // console.log('index ', index, 'page ', page);
        // console.log(this.selectionService.characterIndicator());
        const { loaded, count } = this.selectionService.characterIndicator();
        this.setItemSize(index);
        // (page * 20 - loaded <= 20) &&
        if (end >= total * 0.9 && nextPage && page && currentView === 'list' && !this.isLoading()) {
          // if (index === page && end >= total * 0.9 && nextPage && page && currentView === 'list' && !this.isLoading()) {
          // if (end >= total * 0.9 && nextPage && page && currentView === 'list' && !this.isLoading()) {
          this.loadCharactersOnScroll();
          // this.viewport.scrollToIndex(this.p, 'smooth');
          // this.disableScrollWhenLoading();

        } else if (end >= total * 0.9 && nextPage && page && currentView === 'grid' && !this.isLoading()) {
          this.loadCharactersOnScroll();
          // this.viewport.scrollToIndex(this.p, 'smooth');
          // this.disableScrollWhenLoading();

        }
      }
    }
  }

  getViewportSize() {
    const end = this.viewport?.getRenderedRange().end;
    const total = this.viewport?.getDataLength();
    const offset = this.viewport?.measureScrollOffset();
    // SCROLL GUARD: Scroll direction = down only
    if (offset < this.lastScrollOffset) {
      this.lastScrollOffset = offset;
      return;
    }
    this.lastScrollOffset = offset;
    return {
      end, total, offset
    }
  }

  setItemSize(index: number) {
    if (index > 0) {
      this.itemSize.set(1100);
    }
  }

  /**
 * Initialize data from resolver
 */
  private initializeData(): void {
    if (this.charactersResolver) {
      this.processCharactersData(this.charactersResolver, 'scroll');
    }
  }

  processCharactersData = (charactersData: ICharactersResponse, actionType: 'filter' | 'search' | 'scroll') => {

    const existing = this.characters();
    const merged = [...existing, ...charactersData.characters];
    merged.sort((a, b) => Number(a.id) - Number(b.id));
    const uniq = new Map(merged.map(c => [c.id, c]));
    this.characters.set([...uniq.values()]);
    this.allCharacters.set([...uniq.values()]);
    this.selectionService.characterIndicator.set({
      loaded: this.characters().length,
      count: charactersData.count!
    });

  }

  /**
   * initial load & filter response
   */
  charactersResponse$ = this.selectionService.filter$.pipe(
    debounceTime(100),
    distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
    tap((filter: IFilterPayload) => {
      this.newFilterRequest(filter);
      // this.resetFilter(filter);
    }),
    switchMap((filter) => {
      const { page, count } = this.pagination();
      this.isLoading.set(true);
      return this.charactersService.getCharacters(page, filter).pipe(
        tap((response: ICharactersResponse) => {
          this.processCharactersData(response, 'filter');
          this.pagination.update(p => ({ ...p, nextPage: response.nextPage ?? null, count: response.count }));
          this.selectionService.pageIndicator.set({ activePage: response.nextPage, count: response.count });
          // console.log(this.pagination())
          this.isLoading.set(false);

          this.handleResetFilter();
        })
      );
    }),
    shareReplay(1) // optional, to avoid unnecessary re-fetching
  );

  handleResetFilter() {
    if (this.selectionService.resetFilters()) {
      this.onScroll(0);
      this.viewport.scrollToIndex(0);
      this.selectionService.resetFilters.set(false);
      this.cdr.markForCheck();
    }
  }

  newFilterRequest(filter: IFilterPayload) {
    if (filter.name !== this.prevFilter().name ||
      filter.status !== this.prevFilter().status ||
      filter.gender !== this.prevFilter().gender ||
      filter.species !== this.prevFilter().species ||
      filter.type !== this.prevFilter().type) {

      this.prevFilter.update((v) => ({
        ...v, name: filter.name,
        status: filter.status, gender: filter.gender,
        species: filter.species, type: filter.type
      }));

      this.pagination.update(page => ({ ...page, filterPayload: filter, page: 1, nextPage: null }));

      this.itemSize.set(150);

      this.characters.set([]);
    }
  }
  // resetFilter(filter: IFilterPayload) {
  //   if (filter.name === '' || filter.status === '' || filter.gender === '' || filter.species === '' || filter.type === '') {
  //     // const { page, nextPage } = this.paginationSignal$();
  //     // this.paginationSignal$.set({ page: page, nextPage: nextPage, filterPayload: filter });
  //     this.paginationSignal$.update(page => ({ ...page, filterPayload: filter, nextPage: null }));
  //     console.log('resetFilter ', this.paginationSignal$());
  //   }
  // }
  /**
   * on scroll event as pagination
   */
  loadCharactersOnScroll(): void {
    const { page, nextPage, filterPayload } = this.pagination();
    if (nextPage && !this.isLoading()) {
      this.isLoading.set(true);
      // console.log('nextPage ', nextPage);
      // console.log(this.pagination());
      this.charactersService.getCharacters(nextPage, filterPayload).subscribe(response => {
        this.processCharactersData(response, 'scroll');
        this.pagination.update(p => ({
          ...p, page: response.page,
          nextPage: response.nextPage ?? null,
          count: response.count
        }));
        this.selectionService.pageIndicator.set({ activePage: response.nextPage, count: response.count });
        this.isLoading.set(false);

      });
    }
  }




}


