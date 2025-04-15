import { Component, Input } from '@angular/core';
import { Character, ICharactersResponse } from '../../models/character.model';

@Component({
  selector: 'app-grid-view',
  imports: [],
  standalone:true,
  templateUrl: './grid-view.component.html',
  styleUrl: './grid-view.component.scss'
})
export class GridViewComponent {
  @Input() character!:Character;
}
