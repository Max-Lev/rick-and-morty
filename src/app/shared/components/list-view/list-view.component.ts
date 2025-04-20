import { Component, inject, input, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ColorPipe } from '../../pipes/color.pipe';
import { IsEmptyPipe } from '../../pipes/is-empty.pipe';
import { Character } from '../../models/character.model';
import { SelectionService } from '../../providers/selection.service';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-list-view',
  imports: [
    IsEmptyPipe,
    ColorPipe,
    MatTableModule
  ],
  standalone: true,
  templateUrl: './list-view.component.html',
  styleUrl: './list-view.component.scss'
})
export class ListViewComponent implements OnChanges {

  @Input({ required: true }) columns: any = [];

  characters = input.required<Character[]>();
  // characters$ = toObservable(this.characters);
  displayedColumns = input.required<string[]>();
  // displayedColumns$ = toObservable(this.displayedColumns);

  selectionService = inject(SelectionService);

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
