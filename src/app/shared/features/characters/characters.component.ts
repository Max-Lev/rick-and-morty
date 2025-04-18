import {
  Component, ViewChild, signal, computed, effect, inject, ChangeDetectionStrategy,
  ChangeDetectorRef, OnInit,
  Signal,
  WritableSignal,
  Input,
  input,
  AfterViewInit
} from '@angular/core';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { CharactersService } from '../../../core/providers/characters.service';
import { MatTableModule } from '@angular/material/table';
import { COLUMNS } from './columns.config';
import { Character, ICharacterColumns, ICharactersResponse } from '../../models/character.model';
import { SelectionService } from '../../providers/selection.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { map, switchMap, tap } from 'rxjs/operators';
import { IsEmptyPipe } from '../../pipes/is-empty.pipe';
import { GridViewComponent } from '../../components/grid-view/grid-view.component';
import { CommonModule } from '@angular/common';
import { ColorPipe } from '../../pipes/color.pipe';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [
    ScrollingModule,
    MatTableModule,
    IsEmptyPipe,
    ColorPipe,
    GridViewComponent,
    CommonModule
  ],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharactersComponent implements OnInit, AfterViewInit {
  @ViewChild(CdkVirtualScrollViewport) viewport!: CdkVirtualScrollViewport;

  characters: WritableSignal<Character[]> = signal<Character[]>([]);

  isLoadingSignal$ = signal(false);

  charactersService = inject(CharactersService);

  selectionService = inject(SelectionService);

  // isLoadedSignal$ = computed(() => { return this.charactersService.isLoaded() });

  cdr = inject(ChangeDetectorRef);

  lastScrollOffset = 0;

  columns = COLUMNS;

  displayedColumns$ = computed(() => this.columns.map(c => c.columnDef));

  @Input() charactersResolver!: ICharactersResponse;

  //INITIAL VIEW LOAD CONFIG
  selectedViewSignal$ = this.selectionService.selectedViewSignal$;
  // DYNAMIC SCROLL HIGHT
  itemSizeSignal$ = signal<number>(200);

  scrollIndexSignal$ = signal<number>(0);
  setScrollIndex = () => this.scrollIndexSignal$.update(index => index + 1)


  paginationSignal$ = signal<{ page: number, nextPage: number | null }>({ page: 1, nextPage: null });
  readonly currentPageSignal$ = computed(() => this.paginationSignal$().page);

  constructor() {
    effect(() => {
      console.log('characters length: ', this.characters().length)
      console.log('currentPageSignal$ ', this.currentPageSignal$())
      console.log('scrollIndexSignal$: ', this.scrollIndexSignal$())
    })
  }

  ngOnInit(): void {
    this.getResolvedData();
  }

  ngAfterViewInit() {

  }

  trackById(index: number, item: Character) {
    return item.id;
  }

  onScroll(index: number): void {

    const { page, nextPage } = this.paginationSignal$();
    if (nextPage && index > 0 && nextPage > page) {

      const end = this.viewport.getRenderedRange().end;
      const total = this.viewport.getDataLength();
      const offset = this.viewport.measureScrollOffset();
      this.setItemSize(index);

      // SCROLL GUARD: Scroll direction = down only
      if (offset < this.lastScrollOffset) {
        this.lastScrollOffset = offset;
        return;
      }

      this.setScrollIndex();

      this.lastScrollOffset = offset;

      // Prevent loading if already in progress or nothing more to load
      // if (end >= total * 0.9 && this.nextPageSignal$() && !this.isLoadingSignal$()) {
      const { page, nextPage } = this.paginationSignal$();
      if (end >= total * 0.9 && nextPage && page && !this.isLoadingSignal$()) {
        this.loadCharacters();
      }
    }
  }

  setItemSize(index: number) {
    if (index > 0) {
      this.itemSizeSignal$.set(1100);
    }
  }

  getResolvedData(): void {
    if (!this.charactersResolver) return;
    this.mergeCharacters(this.charactersResolver);
  }

  mergeCharacters = (charactersData: ICharactersResponse) => {
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
        this.mergeCharacters(response); // safely merges
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


