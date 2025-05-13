import {
  Component, ViewChild, signal, computed, effect, inject, ChangeDetectionStrategy,
  ChangeDetectorRef, OnInit, Input, AfterViewInit
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
import { NgClass } from '@angular/common';
import { EMPTY_FILTER } from '../../models/filter.model';
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

  characters = signal<Character[]>([]);

  isLoadingSignal$ = signal(false);

  charactersService = inject(CharactersService);

  selectionService = inject(SelectionService);

  cdr = inject(ChangeDetectorRef);

  lastScrollOffset = 0;

  columns: ColumnConfig<ICharacterColumns>[] = COLUMNS;

  displayedColumns = computed(() => this.columns.map(c => c.columnDef));

  @Input() charactersResolver!: ICharactersResponse;

  //INITIAL VIEW LOAD CONFIG
  selectedViewSignal$ = this.selectionService.selectedViewSignal$;
  // DYNAMIC SCROLL HIGHT
  itemSizeSignal$ = signal<number>(150);

  paginationSignal$ = signal<IPagination>({ page: 1, nextPage: null, filterPayload: { ...EMPTY_FILTER } });

  readonly currentPageSignal$ = computed(() => this.paginationSignal$().page);

  prevFilter = signal<IFilterPayload>({ ...EMPTY_FILTER });

  layoutSelectionService = inject(LayoutSelectionService);
  layout = computed(() => this.layoutSelectionService.getLayoutType());

  readonly allCharacters = signal<Character[]>([]);

  // @ViewChild('vlist') vlist!: CdkVirtualScrollViewport;
  // @ViewChild('vgrid') vgrid!: CdkVirtualScrollViewport;

  isScrollActive = this.selectionService.scrollNextActive;

  // scrollIndexSignal$ = signal<number>(0);
  // setScrollIndex = () => this.scrollIndexSignal$.update(index => index + 1);


  constructor() {

    effect(() => {
      const filtered = this.filteredCharacters();
      this.characters.set(filtered);
    });

    effect(() => {
      const page = this.paginationSignal$().page;
      this.selectionService.activePage.set(page);
    });

    effect(() => {

      const page = this.paginationSignal$().page;
      if (this.isScrollActive()) {

        this.selectionService.activePage.set(page);

        if (this.selectedViewSignal$() === 'list') {
          this.viewport.scrollToIndex(page, 'smooth');
        }
        else {
          const gridIndex = this.gridScrollState();
          // this.viewport.scrollToIndex(gridIndex + 20, 'smooth');
          if (page !== 1) {
            this.viewport.scrollToIndex(page * 20, 'smooth');
          } else {
            this.viewport.scrollToIndex(gridIndex + 20, 'smooth');
          }
        }
        this.selectionService.scrollNextActive.update((v) => false);
      }
    });

  }
  /**
   * search live hitting and no api search
   */
  readonly filteredCharacters = computed(() => {
    const { name, status, gender } = this.selectionService.localSearchFiltersPayload$();
    const keys = Object.keys(this.selectionService.localSearchFiltersPayload$());
    // console.log('computed filteredCharacters allCharacters()', this.allCharacters())
    return this.allCharacters().filter(character => {
      const matchName = !name || character.name.toLowerCase().includes(name.toLowerCase());
      const matchStatus = !status || character.status.toLowerCase() === status.toLowerCase();
      const matchGender = !gender || character.gender.toLowerCase() === gender.toLowerCase();
      // console.log('matchName: ', matchName, 'matchStatus:', matchStatus, 'matchGender:', matchGender);
      return matchName && matchStatus && matchGender;
    });
  });

  ngOnInit(): void {
    this.getResolvedData();
    this.charactersResponse$.pipe().subscribe();
  }

  ngAfterViewInit() {
    const viewportSize = this.getViewportSize();
    if (!viewportSize) return;

    // this.selectionService.viewChanged$.subscribe((view: string) => {
    //   if (view === 'list' && this.selectionService.viewChangeActive()) {
    //     this.selectionService._listScrollState.set(this.listScrollState());
    //     // console.log('list viewChanged, using saved position:', this.selectionService._listScrollState());
    //     // Use the previously saved list scroll state
    //     setTimeout(() => {
    //       this.viewport.scrollToIndex(this.selectionService._listScrollState(),'smooth');
    //     },1000);

    //   } 
    //   if (view === 'grid' && this.selectionService.viewChangeActive()) {
    //     this.selectionService._gridScrollState.set(this.gridScrollState());
    //     // console.log('grid viewChanged, using saved position:', this.selectionService._gridScrollState());
    //     // Use the previously saved grid scroll state
    //     setTimeout(() => {
    //       this.viewport.scrollToIndex(this.selectionService._gridScrollState(),'smooth');
    //     },1000);

    //   }

    // });

    // this.viewport.elementScrolled().subscribe(e=>console.log(e))

  }

  // listScrollState = signal<number>(0);
  gridScrollState = signal<number>(0);
  onScroll(index: number): void {

    const disableScroll = this.selectionService.disableFilterNextScroll();
    if (disableScroll) return;

    const { page, nextPage } = this.paginationSignal$();

    const viewportSize = this.getViewportSize();
    const currentView = this.selectedViewSignal$();

    // if (currentView === 'list') {
    //   // console.log('list index', index);
    //   this.listScrollState.set(index);
    // } else 
    if (currentView === 'grid') {
      this.gridScrollState.set(index);
    }

    if (nextPage && index > 0 && nextPage > page) {

      if (!viewportSize) return;
      const { end, total } = viewportSize;

      this.setItemSize(index);
      // console.log('index', index, 'page ', page);
      // console.log('this.isScrollActive()', this.isScrollActive());
      // console.log('this.isLoadingSignal$()', this.isLoadingSignal$());
      if (index === page && end >= total * 0.9 && nextPage && page && currentView === 'list' && !this.isLoadingSignal$()) {
        this.loadCharactersOnScroll();
      } else if (end >= total * 0.9 && nextPage && page && currentView === 'grid' && !this.isLoadingSignal$()) {
        this.loadCharactersOnScroll();
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
      this.itemSizeSignal$.set(1100);
    }
  }

  getResolvedData(): void {
    if (!this.charactersResolver) return;
    this.setCharactersData(this.charactersResolver);
  }

  setCharactersData = (charactersData: ICharactersResponse) => {
    const existing = this.characters();
    const merged = [...existing, ...charactersData.characters];
    const uniq = new Map(merged.map(c => [c.id, c]));
    this.characters.set([...uniq.values()]);
    this.allCharacters.set([...uniq.values()]);
    console.info('total:', this.characters().length, 'characters ', this.characters());
    this.isLoadingSignal$.set(false);
  }

  /**
   * initial load & filter response
   */
  charactersResponse$ = this.selectionService.filter$.pipe(
    debounceTime(250), // Optional debounce
    distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
    tap((filter: IFilterPayload) => {
      this.newFilterRequest(filter);
      // this.resetFilter(filter);
    }),
    switchMap((filter) => {
      const { page } = this.paginationSignal$();
      // console.log('page', page);
      this.isLoadingSignal$.set(true);
      return this.charactersService.getCharacters(page, filter).pipe(
        tap((response: ICharactersResponse) => {
          console.log('charactersResponse$', response);
          this.setCharactersData(response);
          this.paginationSignal$.update(p => ({ ...p, nextPage: response.nextPage ?? null }));
          // console.log(this.paginationSignal$());
          this.isLoadingSignal$.set(false);

          this.resetFilterHandler();

        })
      );
    }),
    // shareReplay(1) // optional, to avoid unnecessary re-fetching
  );

  resetFilterHandler() {
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

      this.paginationSignal$.update(page => ({ ...page, filterPayload: filter, page: 1, nextPage: null }));
      // this.paginationSignal$.update(page => ({ ...page, filterPayload: filter, nextPage: null }));
      // console.log('newFilterRequest ', this.paginationSignal$());

      this.itemSizeSignal$.set(150);

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
    const { page, nextPage, filterPayload } = this.paginationSignal$();
    // console.log('filterPayload', filterPayload)
    if (nextPage) {
      this.isLoadingSignal$.set(true);
      // this.paginationSignal$.update(p => ({ ...p, page: nextPage }));
      this.paginationSignal$.update(p => ({ ...p, page: page }));
      // console.log(this.paginationSignal$());
      // console.log('filterPayload', filterPayload)
      this.charactersService.getCharacters(nextPage, filterPayload).subscribe(response => {
        this.setCharactersData(response);
        // console.log('loadCharactersOnScroll$', response);
        this.paginationSignal$.update(p => ({ ...p, page: response.page, nextPage: response.nextPage ?? null }));
        // console.log(this.paginationSignal$());
        // this.paginationSignal$.update(p => ({ page:response. nextPage: response.nextPage ?? null }));
        this.isLoadingSignal$.set(false);
      });
    }
  }



}


