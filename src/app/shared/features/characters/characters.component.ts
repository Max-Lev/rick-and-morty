import {
  Component, ViewChild, signal, computed, effect, inject, ChangeDetectionStrategy,
  ChangeDetectorRef, OnInit,
  Signal,
  WritableSignal,
  Input,
  input
} from '@angular/core';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { CharactersService } from '../../../core/providers/characters.service';
import { MatTableModule } from '@angular/material/table';
import { COLUMNS } from './columns.config';
import { Character, ICharacterColumns, ICharactersResponse } from '../../models/character.model';
import { SelectionService } from '../../providers/selection.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap, tap } from 'rxjs/operators';
import { IsEmptyPipe } from '../../pipes/is-empty.pipe';
import { GridViewComponent } from '../../components/grid-view/grid-view.component';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [
    ScrollingModule,
    MatTableModule,
    IsEmptyPipe,
    GridViewComponent
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

  pageSignal$ = signal<number | null>(1);

  @Input() charactersResolver!: ICharactersResponse;

  selectedViewSignal$ = this.selectionService.selectedViewSignal$;
  
  constructor() {
    effect(() => {
      console.log('charactersSignal$: ', this.charactersSignal$());
    });
    effect(() => {
      console.log('selectedViewSignal$: ', this.selectedViewSignal$());
    });
  }

  ngOnInit(): void {
    this.getResolvedData();
  }

  onScroll(): void {
    const end = this.viewport.getRenderedRange().end;
    const total = this.viewport.getDataLength();
    const offset = this.viewport.measureScrollOffset();
    // console.log('end, ', end, 'total, ', total, 'offset, ', offset);
    // SCROLL GUARD: Scroll direction = down only
    if (offset < this.lastScrollOffset) {
      this.lastScrollOffset = offset;
      return;
    }

    this.lastScrollOffset = offset;

    // Prevent loading if already in progress or nothing more to load
    if (end >= total * 0.5 && this.nextPageSignal$() && !this.isLoadingSignal$()) {
      this.loadCharacters();
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
    this.nextPageSignal$.set(charactersData.nextPage);
    this.isLoadingSignal$.set(false);
  }

  charactersResponse$: Signal<ICharactersResponse> = toSignal(
    toObservable(this.pageSignal$).pipe(
      tap(() => this.isLoadingSignal$.set(true)),
      switchMap(page => this.charactersService.getCharacters(page as number)),
      tap((response: ICharactersResponse) => {
        this.mergeCharacters(response);
        console.log('response: ', response);
        return response;
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


/**
 * import {
  Component, ViewChild, signal, computed, effect, inject, ChangeDetectionStrategy,
  ChangeDetectorRef, OnInit,
  Signal,
  WritableSignal,
  Input,
  input
} from '@angular/core';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { CharactersService } from '../../../core/providers/characters.service';
import { MatTableModule } from '@angular/material/table';
import { COLUMNS } from './columns.config';
import { Character, ICharacterColumns, ICharactersResponse } from '../../models/character.model';
import { SelectionService } from '../../providers/selection.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap, tap } from 'rxjs/operators';
import { IsEmptyPipe } from '../../pipes/is-empty.pipe';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [
    ScrollingModule,
    MatTableModule,
    IsEmptyPipe
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

  pageSignal$ = signal<number | null>(1);

  // @Input() charactersResolver!: ICharactersResponse;
  // charactersResolver = input<ICharactersResponse>({characters:[],nextPage:0});
  charactersResolver = input<ICharactersResponse>();
  private lastResolvedPage: number | null = null;
  // Purely derives what merged list should look like — no side effects
  // readonly resolvedCharacters = computed(() => {
  //   const resolver = this.charactersResolver();
  //   const existing = this.characters();

  //   if (!resolver) return existing;

  //   const merged = [...existing, ...resolver.characters];
  //   const uniq = new Map(merged.map(c => [c.id, c]));
  //   return [...uniq.values()];
  // });
  readonly resolvedCharacters = computed(() => {
    const resolver = this.charactersResolver();
    if (!resolver) return [];
  
    const uniq = new Map(resolver.characters.map(c => [c.id, c]));
    return [...uniq.values()];
  });

  constructor() {

    // effect(() => {
    //   const resolver = this.charactersResolver();
    //   if (!resolver || resolver.nextPage === this.lastResolvedPage) return;

    //   this.lastResolvedPage = resolver.nextPage;
    //   this.mergeCharacters(resolver);
    // });
    // effect(() => {
    //   const resolver = this.charactersResolver();
    //   if (!resolver) return;

    //   const merged = this.resolvedCharacters();
    //   this.characters.set(merged);
    //   this.nextPageSignal$.set(resolver.nextPage);
    //   this.isLoadingSignal$.set(false);
    // });
    effect(() => {
      const resolver = this.charactersResolver();
      if (!resolver || resolver.nextPage === this.lastResolvedPage) return;
    
      this.lastResolvedPage = resolver.nextPage;
    
      const existing = this.characters();
      const merged = [...existing, ...resolver.characters];
      const uniq = new Map(merged.map(c => [c.id, c]));
      this.characters.set([...uniq.values()]);
      this.nextPageSignal$.set(resolver.nextPage);
      this.isLoadingSignal$.set(false);
    });

    effect(() => {
      console.log('charactersSignal$: ', this.charactersSignal$());
    });
  }

  ngOnInit(): void {
    // this.getResolvedData();
  }

  onScroll(): void {
    const end = this.viewport.getRenderedRange().end;
    const total = this.viewport.getDataLength();
    const offset = this.viewport.measureScrollOffset();
    // console.log('end, ', end, 'total, ', total, 'offset, ', offset);
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

  // getResolvedData(): void {
  //   if (!this.charactersResolver) return;
  //   this.mergeCharacters(this.charactersResolver());
  // }

  // mergeCharacters = (charactersData: ICharactersResponse) => {
  //   const existing = this.characters();
  //   const merged = [...existing, ...charactersData.characters];
  //   const uniq = new Map(merged.map(c => [c.id, c]));
  //   this.characters.set([...uniq.values()]);
  //   this.nextPageSignal$.set(charactersData.nextPage);
  //   this.isLoadingSignal$.set(false);
  // }

  charactersResponse$: Signal<ICharactersResponse> = toSignal(
    toObservable(this.pageSignal$).pipe(
      tap(() => this.isLoadingSignal$.set(true)),
      switchMap(page => this.charactersService.getCharacters(page as number)),
      tap((response: ICharactersResponse) => {
        // this.mergeCharacters(response);
        const merged = [...this.characters(), ...response.characters];
        const uniq = new Map(merged.map(c => [c.id, c]));
        this.characters.set([...uniq.values()]);
        this.nextPageSignal$.set(response.nextPage);
        this.isLoadingSignal$.set(false);
        console.log('response: ', response);
        return response;


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



 */