import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Character } from '../../models/character.model';
import { SelectionService } from '../../providers/selection.service';
import { MatIcon } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { ColorPipe } from '../../pipes/color.pipe';

@Component({
  selector: 'app-grid-view',
  imports: [
    MatIcon,
    ColorPipe

  ],
  standalone:true,
  templateUrl: './grid-view.component.html',
  styleUrl: './grid-view.component.scss'
})
export class GridViewComponent implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    
  }
  @Input() character!:Character;
  selectionService = inject(SelectionService);

  selectedRow = (row: Character): void => {
    console.log(row)
    this.selectionService.toggleRow(row);
  }

  isSelected(row: Character): boolean {
    return this.selectionService.getSelectedRows().has(row);
  }
}
