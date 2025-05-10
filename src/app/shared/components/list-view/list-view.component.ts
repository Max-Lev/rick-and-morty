import { Component, effect, inject, input, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ColorPipe } from '../../pipes/color.pipe';
import { IsEmptyPipe } from '../../pipes/is-empty.pipe';
import { Character, ColumnConfig, ICharacterColumns } from '../../models/character.model';
import { SelectionService } from '../../providers/selection.service';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { JsonPipe } from '@angular/common';
import { NameRowComponent } from './template/name-row/name-row.component';
import { RowComponent } from './template/row/row.component';
import { GenderPipe } from '../../pipes/gender.pipe';

@Component({
  selector: 'app-list-view',
  imports: [
    IsEmptyPipe,
    ColorPipe,
    MatTableModule,
    MatTooltipModule,
    NameRowComponent,
    RowComponent,
    GenderPipe
  ],
  standalone: true,
  templateUrl: './list-view.component.html',
  styleUrl: './list-view.component.scss'
})
export class ListViewComponent {

  @Input({ required: true }) columns: ColumnConfig<ICharacterColumns>[] =[];

  characters = input.required<Character[]>();

  displayedColumns = input.required<string[]>();

  selectionService = inject(SelectionService);

  constructor() {

  }

  isSelected(row: Character): boolean {
    return this.selectionService.getSelectedRows().has(+row.id);
  }
  
  selectedRow = (row: Character): void => this.selectionService.toggleRow(row);
  


}
