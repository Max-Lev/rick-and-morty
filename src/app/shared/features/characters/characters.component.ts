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
import { switchMap, tap } from 'rxjs/operators';
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

  private characters: WritableSignal<Character[]> = signal<Character[]>([]);

  charactersComputed$ = computed(() => this.characters());

  nextPageSignal$ = signal<number>(1);

  isLoadingSignal$ = signal(false);

  charactersService = inject(CharactersService);

  selectionService = inject(SelectionService);

  isLoadedSignal$ = computed(() => { return this.charactersService.isLoaded() });

  cdr = inject(ChangeDetectorRef);

  lastScrollOffset = 0;

  columns = COLUMNS;

  displayedColumns$ = computed(() => this.columns.map(c => c.columnDef));

  pageSignal$ = signal<number | null>(1);

  @Input() charactersResolver!: ICharactersResponse;

  //INITIAL VIEW LOAD CONFIG
  selectedViewSignal$ = this.selectionService.selectedViewSignal$;
  // selectedViewSignal$2 = computed(()=>{
  //   console.log('change view: ',this.scrollIndexSignal$())
  //   return this.selectionService.selectedViewSignal$();
  // });
  
  // DYNAMIC SCROLL HIGHT
  itemSizeSignal$ = signal<number>(200);
  itemSizeComputed$ = computed(() => this.itemSizeSignal$());
  scrollIndexSignal$ = signal<number>(0);
  setScrollIndex = () => this.scrollIndexSignal$.update(index => index + 1)


  constructor() {
    effect(() => {
      console.log('charactersComputed$ total: ', this.charactersComputed$());
    });
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

    console.log('this.pageSignal$()', this.pageSignal$());
    console.log('this.nextPageSignal$()', this.nextPageSignal$());

    if ((this.nextPageSignal$() - this.pageSignal$()!) === 1 && index > 0) {
      // if ((this.nextPageSignal$() - 1) === 1) {
      const end = this.viewport.getRenderedRange().end;
      const total = this.viewport.getDataLength();
      const offset = this.viewport.measureScrollOffset();
      console.log(this.viewport.measureScrollOffset('top'),this.viewport.measureScrollOffset('bottom'));
      console.log('measureRenderedContentSize height: ',this.viewport.measureRenderedContentSize());
      console.log('measureViewportSize: ',this.viewport.measureViewportSize('vertical'))
      console.log(this.viewport.measureBoundingClientRectWithScrollOffset('top'))
      console.log(this.viewport.measureBoundingClientRectWithScrollOffset('bottom'))
      this.setItemSize(index);
      console.log(this.viewport.getViewportSize());
      // console.log(this.viewport.data);
      // console.log('end, ', end, 'total, ', total, 'offset, ', offset);
      // SCROLL GUARD: Scroll direction = down only
      if (offset < this.lastScrollOffset) {
        this.lastScrollOffset = offset;
        return;
      }

      this.setScrollIndex();
      console.log('scrollIndexSignal$: ', this.scrollIndexSignal$())
      // console.log('lastScrollOffset$: ', this.lastScrollOffset)

      this.lastScrollOffset = offset;

      // Prevent loading if already in progress or nothing more to load
      if (end >= total * 0.9 && this.nextPageSignal$() && !this.isLoadingSignal$()) {
        // console.log('end, ', end, 'total, ', total, 'offset, ', offset);
        if ((this.pageSignal$() as number - this.scrollIndexSignal$() > 1)) {
          return;
        }
        this.loadCharacters();
      }
    }
  }

  setItemSize(index: number) {
    if (index > 0) {
      // this.itemSizeSignal$.set(1000);
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
    this.nextPageSignal$.set(charactersData.nextPage as number);
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


