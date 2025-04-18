import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Character } from '../../models/character.model';
import { SelectionService } from '../../providers/selection.service';

@Component({
  selector: 'app-grid-view',
  imports: [
    
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

  isSelected(row: Character): boolean {
    return this.selectionService.getSelectedRows().has(row);
  }
}
