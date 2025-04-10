import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CharactersService } from './core/providers/characters.service';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Character } from './core/models/characters.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NgIf,
    AsyncPipe,
    NgFor
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  charactersService = inject(CharactersService);
  characters = signal<Character[]>([]);
  nextPage = signal<number | null>(1);


  loadMore() {
    const page = this.nextPage();
    if (page === null) return;

    this.charactersService.getCharacters(page).subscribe((data) => {
      this.characters.update((prev) => [...prev, ...data.characters]);
      this.nextPage.set(data.nextPage);
    });
  }

  ngOnInit(): void {
    this.loadMore();
  }
}
