import {
  Component, ViewChild, signal, computed, effect, inject, ChangeDetectionStrategy,
  ChangeDetectorRef, OnInit, Signal, Input, AfterViewInit
} from '@angular/core';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { CharactersService } from '../../../core/providers/characters.service';
import { COLUMNS } from './columns.config';
import { Character, ColumnConfig, ICharacterColumns, ICharactersResponse } from '../../models/character.model';
import { SelectionService } from '../../providers/selection.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap, tap } from 'rxjs/operators';
import { GridViewComponent } from '../../components/grid-view/grid-view.component';
import { ListViewComponent } from '../../components/list-view/list-view.component';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [
    ScrollingModule,
    ListViewComponent,
    GridViewComponent,

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

  paginationSignal$ = signal<{ page: number, nextPage: number | null }>({ page: 1, nextPage: null });
  readonly currentPageSignal$ = computed(() => this.paginationSignal$().page);

  selectedCount$ = this.selectionService.getSelectedData();
  
  constructor() {
    effect(() => {
      console.log('characters length: ', this.characters().length)
      // console.log('currentPageSignal$ ', this.currentPageSignal$())
      console.log('scrollIndexSignal$: ', this.scrollIndexSignal$());
      console.log('selectedCount$: ', this.selectedCount$());
      
    })
  }

  ngOnInit(): void {
    this.getResolvedData();
  }

  ngAfterViewInit() {

  }

  onScroll(index: number): void {

    const { page, nextPage } = this.paginationSignal$();

    const viewportSize = this.getViewportSize();

    if (nextPage && index > 0 && nextPage > page) {

      if (!viewportSize) return;
      const { end, total } = viewportSize;

      this.setItemSize(index);

      this.setScrollIndex();
      // Prevent loading if already in progress or nothing more to load
      if (end >= total * 0.9 && nextPage && page && !this.isLoadingSignal$()) {
        this.loadCharacters();
      }

    }
  }

  getViewportSize() {
    const end = this.viewport.getRenderedRange().end;
    const total = this.viewport.getDataLength();
    const offset = this.viewport.measureScrollOffset();
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
    this.isLoadingSignal$.set(false);
  }

  // ✅ A clean page-only signal
  // ✅ Response stream that only triggers on `page` changes
  charactersResponse$: Signal<ICharactersResponse> = toSignal(
    toObservable(this.currentPageSignal$).pipe(
      tap(() => this.isLoadingSignal$.set(true)),
      switchMap(page => this.charactersService.getCharacters(page)),
      tap((response: ICharactersResponse) => {
        this.setCharactersData(response); // safely merges
        this.paginationSignal$.update(p => ({
          ...p,
          nextPage: response.nextPage ?? null // ⚠️ Only this updates, page stays same
        }));
        this.isLoadingSignal$.set(false);
      })
    ),
    { initialValue: { characters: [], nextPage: null } }
  );

  loadCharacters(): void {
    const { nextPage } = this.paginationSignal$();
    if (nextPage) {
      this.paginationSignal$.update(p => ({ ...p, page: nextPage }));
    }
  }

  selectedRow = (row: Character): void => {
    console.log(row)
    this.selectionService.toggleRow(row);
  }
  selectedRowCharacter = (character: Character): void => {
    console.log(character)
  }

  isSelected(row: Character): boolean {
    return this.selectionService.getSelectedRows().has(row);
  }


}


