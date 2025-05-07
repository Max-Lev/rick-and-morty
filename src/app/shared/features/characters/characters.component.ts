import {
  Component, ViewChild, signal, computed, effect, inject, ChangeDetectionStrategy,
  ChangeDetectorRef, OnInit, Signal, Input, AfterViewInit
} from '@angular/core';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { CharactersService } from '../../../core/providers/characters.service';
import { COLUMNS } from './columns.config';
import { Character, ColumnConfig, ICharacterColumns, ICharactersResponse, IFilterPayload, IPagination } from '../../models/character.model';
import { SelectionService } from '../../providers/selection.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, shareReplay, switchMap, take, tap } from 'rxjs/operators';
import { GridViewComponent } from '../../components/grid-view/grid-view.component';
import { ListViewComponent } from '../../components/list-view/list-view.component';
import { LayoutSelectionService } from '../../providers/layout-selection.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [
    ScrollingModule,
    ListViewComponent,
    GridViewComponent,
    NgClass

  ],
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

  scrollIndexSignal$ = signal<number>(0);
  setScrollIndex = () => this.scrollIndexSignal$.update(index => index + 1)

  paginationSignal$ = signal<IPagination>({ page: 1, nextPage: null, filterPayload: { name: '', status: '' } });
  readonly currentPageSignal$ = computed(() => {
    return this.paginationSignal$().page;
  });

  // filterSignal$ = this.selectionService.filterSignal$;

  prevFilter = signal<IFilterPayload>({ name: '', status: '' });

  layoutSelectionService = inject(LayoutSelectionService);
  layout = computed(() => this.layoutSelectionService.getLayoutType());

  readonly allCharacters = signal<Character[]>([]);

  constructor() {

    effect(() => {

      const { name, status } = this.selectionService.localSearchFiltersPayload$();
      console.log(name, status);
      const fullList = this.allCharacters();

      const filtered = fullList.filter(character => {
        const matchesName = !name || character.name.toLowerCase().includes(name.toLowerCase());
        const matchesStatus = !status || character.status.toLocaleLowerCase() === status.toLocaleLowerCase();
        return matchesName && matchesStatus;
      });

      this.characters.set(filtered);
      
    });

  }

  ngOnInit(): void {
    this.getResolvedData();
    this.charactersResponse$.pipe().subscribe();
  }

  ngAfterViewInit() {
    const viewportSize = this.getViewportSize();
    if (!viewportSize) return;
    // const { end, total } = viewportSize;
    // console.log('viewportSize ', viewportSize)
    // console.log('end, total ', end, total);
    // console.log('toolbar + scroll height container: ', this.viewport.measureBoundingClientRectWithScrollOffset('bottom'))
    // console.log(this.viewport.checkViewportSize())
    // console.log(this.viewport.measureViewportOffset('bottom'))
    // console.log(this.viewport.getViewportSize())
  }

  onScroll(index: number): void {

    // const getClearFilterBtnState = this.selectionService.getClearFilterBtnState();
    const disableScroll = this.selectionService.disableScroll();
    if (disableScroll) return;

    const { page, nextPage } = this.paginationSignal$();

    const viewportSize = this.getViewportSize();

    if (nextPage && index > 0 && nextPage > page) {

      if (!viewportSize) return;
      const { end, total } = viewportSize;

      this.setItemSize(index);

      this.setScrollIndex();
      // Prevent loading if already in progress or nothing more to load
      if (end >= total * 0.9 && nextPage && page && !this.isLoadingSignal$()) {
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
    console.log('setCharactersData ', this.allCharacters())
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
      this.resetFilter(filter);
    }),
    switchMap((filter) => {
      const { page } = this.paginationSignal$();
      this.isLoadingSignal$.set(true);
      return this.charactersService.getCharacters(page, filter).pipe(
        tap((response: ICharactersResponse) => {
          // console.log('charactersResponse$', response);
          this.setCharactersData(response);
          this.paginationSignal$.update(p => ({ ...p, nextPage: response.nextPage ?? null }));
          this.isLoadingSignal$.set(false);
        })
      );
    }),
    shareReplay(1) // optional, to avoid unnecessary re-fetching
  );

  newFilterRequest(filter: IFilterPayload) {
    debugger;
    if (filter.name !== this.prevFilter().name || filter.status !== this.prevFilter().status) {

      this.prevFilter.update((v) => ({ ...v, name: filter.name, status: filter.status }));

      this.paginationSignal$.update(page => ({ ...page, filterPayload: filter, page: 1, nextPage: null }));

      if (this.paginationSignal$().page === 1) {
        this.itemSizeSignal$.set(150);
      }
      this.characters.set([]);
    }
  }
  resetFilter(filter: IFilterPayload) {
    if (filter.name == '' || filter.status == '') {
      const { page, nextPage } = this.paginationSignal$();
      this.paginationSignal$.set({ page: page, nextPage: nextPage, filterPayload: filter });
    }
  }
  /**
   * on scroll event as pagination
   */
  loadCharactersOnScroll(): void {
    const { page, nextPage, filterPayload } = this.paginationSignal$();
    if (nextPage) {
      this.isLoadingSignal$.set(true);
      this.paginationSignal$.update(p => ({ ...p, page: nextPage }));

      this.charactersService.getCharacters(nextPage, filterPayload).subscribe(response => {
        console.log('loadCharactersOnScroll', response)
        this.setCharactersData(response);
        this.paginationSignal$.update(p => ({ ...p, nextPage: response.nextPage ?? null }));
        console.log('paginationSignal$ ', this.paginationSignal$())
        this.isLoadingSignal$.set(false);
      });
    }
  }



}


