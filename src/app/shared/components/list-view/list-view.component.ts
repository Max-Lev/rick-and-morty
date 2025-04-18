import { Component, inject, input, Input, OnChanges, Signal, SimpleChanges, WritableSignal } from '@angular/core';
import { ColorPipe } from '../../pipes/color.pipe';
import { IsEmptyPipe } from '../../pipes/is-empty.pipe';
import { Character, ColumnConfig, ICharacterColumns } from '../../models/character.model';
import { SelectionService } from '../../providers/selection.service';
import { MatTableModule } from '@angular/material/table';
import { toObservable } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-list-view',
  imports: [
    IsEmptyPipe,
    ColorPipe,
    MatTableModule
  ],
  providers: [
    SelectionService,
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
    return this.selectionService.getSelectedRows().has(row);
  }
  selectedRow = (row: Character): void => {
    console.log(row)
    this.selectionService.toggleRow(row);
  }

  ngOnChanges(changes: SimpleChanges): void {

  }


}
