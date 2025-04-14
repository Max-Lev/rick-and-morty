import { AfterViewInit, ChangeDetectorRef, computed, effect, inject, OnInit, signal} from '@angular/core';
import { Component } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { ToolbarComponent } from './core/components/toolbar/toolbar.component';
import { CharactersComponent } from './components/characters/characters.component';
import { CharactersService } from './core/providers/characters.service';

@Component({
  selector: 'app-root',
  imports: [
    CharactersComponent,
    ToolbarComponent
    // RouterOutlet
  ],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, AfterViewInit {

  // cdr = inject(ChangeDetectorRef);

  charactersService = inject(CharactersService);



  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    // setTimeout(() => {
    //   this.loaded = true;
    //   this.cdr.detectChanges();
    // }, 3000);
  }





}
