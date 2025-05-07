import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnChanges, signal, SimpleChanges } from '@angular/core';
import { MatColumnDef, MatHeaderCellDef, MatCellDef } from '@angular/material/table';
import { NameRowComponent } from '../name-row/name-row.component';
import { RowComponent } from '../row/row.component';
import { ColorPipe } from '../../../../pipes/color.pipe';
import { IsEmptyPipe } from '../../../../pipes/is-empty.pipe';
import { ColumnConfig, ICharacterColumns } from '../../../../models/character.model';
import { COLUMNS } from '../../../../features/characters/columns.config';
import { GenderPipe } from '../../../../pipes/gender.pipe';

@Component({
  selector: 'app-reusable-list-view',
  imports: [
    MatColumnDef, MatHeaderCellDef, MatCellDef, NameRowComponent,
    ColorPipe,
    IsEmptyPipe,
    RowComponent,
    GenderPipe
  ],
  templateUrl: './reusable-list-view.component.html',
  styleUrl: './reusable-list-view.component.scss'
})
export class ReusableListViewComponent {
  
  columns:ColumnConfig<ICharacterColumns>[] =COLUMNS;
  @Input() isSelected = (row: any) => false;

}
