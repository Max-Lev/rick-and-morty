import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Character } from '../../models/character.model';
import { SelectionService } from '../../providers/selection.service';
import { MatIcon } from '@angular/material/icon';
import { ColorPipe } from '../../pipes/color.pipe';
import { IsEmptyPipe } from '../../pipes/is-empty.pipe';
import { IDetailsResponse } from '../../models/details.model';
import { NgStyle } from '@angular/common';
import { GenderPipe } from '../../pipes/gender.pipe';

@Component({
  selector: 'app-grid-view',
  imports: [
    MatIcon,
    ColorPipe,
    IsEmptyPipe,
    GenderPipe
  ],
  standalone: true,
  templateUrl: './grid-view.component.html',
  styleUrl: './grid-view.component.scss'
})
export class GridViewComponent implements OnChanges {

  @Input() character!: Character;
  selectionService = inject(SelectionService);

  ngOnChanges(changes: SimpleChanges): void {
    
  }

  selectedRow = (row: Character): void => {
    this.selectionService.toggleRow(row);
  }


  isSelected(row: Character): boolean {
    return this.selectionService.getSelectedRows().has(+row.id);
  }

}
