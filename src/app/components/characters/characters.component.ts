import { Component, ViewChild, signal, computed, effect, inject, ChangeDetectionStrategy, 
  ChangeDetectorRef, OnInit } from '@angular/core';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { AsyncPipe, NgFor } from '@angular/common';
import { Character } from '../../core/models/characters.model';
import { CharactersService } from '../../core/providers/characters.service';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [ScrollingModule],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharactersComponent implements OnInit {
  @ViewChild(CdkVirtualScrollViewport) viewport!: CdkVirtualScrollViewport;

  private characters = signal<Character[]>([]);

  characters$ = computed(() => this.characters());

  nextPage = signal<number | null>(1);

  isLoading = signal(false);

  charactersService = inject(CharactersService);


  isLoaded = computed(() => { return this.charactersService.isLoaded() });

  cdr = inject(ChangeDetectorRef);

  constructor() {
    effect(() => {
    
    });
    
  }
  ngOnInit(): void {
    this.loadMore();
  }


  onScroll(): void {
    const end = this.viewport.getRenderedRange().end;
    const total = this.viewport.getDataLength();
    if (end >= total * 0.8 && this.nextPage() && !this.isLoading()) {
      this.loadMore();
    }
  }

  loadMore(): void {
    const page = this.nextPage();
    if (page === null) return;

    this.isLoading.set(true);

    this.charactersService.getCharacters(page).subscribe((data: { characters: Character[], nextPage: number | null }) => {

      const existing = this.characters();

      const uniq = new Map<string, Character>();

      [...existing, ...data.characters].forEach(item => uniq.set(item.id, item));

      this.characters.set([...uniq.values()]);

      this.nextPage.set(data.nextPage);

      this.isLoading.set(false);
      console.log(this.characters$())
    });
  }
}


