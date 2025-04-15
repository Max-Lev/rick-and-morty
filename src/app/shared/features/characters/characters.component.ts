import {
  Component, ViewChild, signal, computed, effect, inject, ChangeDetectionStrategy,
  ChangeDetectorRef, OnInit,
  Signal,
  WritableSignal
} from '@angular/core';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { CharactersService } from '../../../core/providers/characters.service';
import { MatTableModule } from '@angular/material/table';
import { COLUMNS } from './columns.config';
import { Character, ICharacterColumns, ICharactersResponse } from '../../models/character.model';
import { SelectionService } from '../../providers/selection.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { filter, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [
    ScrollingModule,
    MatTableModule
  ],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharactersComponent implements OnInit {
  @ViewChild(CdkVirtualScrollViewport) viewport!: CdkVirtualScrollViewport;

  private characters: WritableSignal<Character[]> = signal<Character[]>([]);

  charactersSignal$ = computed(() => this.characters());

  nextPageSignal$ = signal<number | null>(1);

  isLoadingSignal$ = signal(false);

  charactersService = inject(CharactersService);

  selectionService = inject(SelectionService);

  isLoadedSignal$ = computed(() => { return this.charactersService.isLoaded() });

  // cdr = inject(ChangeDetectorRef);

  lastScrollOffset = 0;

  columns = COLUMNS;

  displayedColumns$ = computed(() => this.columns.map(c => c.columnDef));

  pageSignal$ = signal<number>(1);


  constructor() {
    effect(() => {
      console.log(this.selectionService.getSelectedRows());
      console.log(this.selectionService.selectedCount$());
    });

  }
  ngOnInit(): void {
    this.loadCharacters();
  }


  onScroll(): void {
    const end = this.viewport.getRenderedRange().end;
    const total = this.viewport.getDataLength();
    const offset = this.viewport.measureScrollOffset();
    console.log('end, ', end, 'total, ', total, 'offset, ', offset);
    // SCROLL GUARD: Scroll direction = down only
    if (offset < this.lastScrollOffset) {
      this.lastScrollOffset = offset;
      return;
    }

    this.lastScrollOffset = offset;

    // Prevent loading if already in progress or nothing more to load
    if (end >= total * 0.8 && this.nextPageSignal$() && !this.isLoadingSignal$()) {
      this.loadCharacters();
    }
  }

  charactersResponse$: Signal<ICharactersResponse> = toSignal(
    toObservable(this.pageSignal$).pipe(
      tap(() => this.isLoadingSignal$.set(true)),
      switchMap(page => this.charactersService.getCharacters(page)),
      tap((response: ICharactersResponse) => {
        const existing = this.characters();
        const merged = [...existing, ...response.characters];
        const uniq = new Map(merged.map(c => [c.id, c]));
        this.characters.set([...uniq.values()]);
        this.nextPageSignal$.set(response.nextPage);
        this.isLoadingSignal$.set(false);
        console.log(response);
        return response
      })
    ),
    {
      initialValue: { characters: [], nextPage: null }
    }
  );

  loadCharacters(): void {
    const next = this.nextPageSignal$();
    if (next) this.pageSignal$.set(next);
  }

  selectedRow = (row: ICharacterColumns): void => {
    this.selectionService.toggleRow(row);
  }

  isSelected(row: ICharacterColumns): boolean {
    return this.selectionService.getSelectedRows().has(row);
  }


}


