import { Component, effect, inject, input, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ColorPipe } from '../../pipes/color.pipe';
import { IsEmptyPipe } from '../../pipes/is-empty.pipe';
import { Character } from '../../models/character.model';
import { SelectionService } from '../../providers/selection.service';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-list-view',
  imports: [
    IsEmptyPipe,
    ColorPipe,
    MatTableModule,
    MatTooltipModule,
  ],
  standalone: true,
  templateUrl: './list-view.component.html',
  styleUrl: './list-view.component.scss'
})
export class ListViewComponent implements OnChanges {

  @Input({ required: true }) columns: any = [];

  characters = input.required<Character[]>();

  displayedColumns = input.required<string[]>();

  selectionService = inject(SelectionService);

  constructor() {
    effect(() => {
      console.log('mock')
      const c1 = {
        "selected": false,
        "__typename": "Character",
        "id": "1",
        "name": "Rick Sanchez",
        "status": "Alive",
        "species": "Human",
        "gender": "Male",
        "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
        "type": ""
      };
      this.selectedRow(c1);
      const c2 = {
        "selected": true,
        "__typename": "Character",
        "id": "2",
        "name": "Morty Smith",
        "status": "Alive",
        "species": "Human",
        "gender": "Male",
        "image": "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
        "type": ""
      }
      this.selectedRow(c2);
    });
  }

  isSelected(row: Character): boolean {
    return this.selectionService.getSelectedRows().has(+row.id);
  }
  selectedRow = (row: Character): void => {
    console.log(row)
    this.selectionService.toggleRow(row);
  }

  ngOnChanges(changes: SimpleChanges): void {

  }


}
