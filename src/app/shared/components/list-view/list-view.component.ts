import { Component, inject, input, Input, OnChanges, SimpleChanges, WritableSignal } from '@angular/core';
import { ColorPipe } from '../../pipes/color.pipe';
import { IsEmptyPipe } from '../../pipes/is-empty.pipe';
import { Character, ColumnConfig, ICharacterColumns } from '../../models/character.model';
import { SelectionService } from '../../providers/selection.service';
import { MatTableModule } from '@angular/material/table';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-list-view',
  imports: [
    IsEmptyPipe,
    ColorPipe,
    MatTableModule,
  ],
  providers: [
    SelectionService
  ],
  standalone: true,
  templateUrl: './list-view.component.html',
  styleUrl: './list-view.component.scss'
})
export class ListViewComponent implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
    console.log(this.displayedColumns)
    console.log(this.characters)
  }

  @Input({required:true}) columns:any = []
  // @Input() columns!:ColumnConfig<ICharacterColumns>[];

  // characters = input.required<Character[]>({});
  // characters$ = toObservable(this.characters);

  // displayedColumns$ = input.required<string[]>();

  @Input() characters!: Character[];
  @Input() displayedColumns!: string[];

  selectionService = inject(SelectionService);

  isSelected(row: Character): boolean {
    return this.selectionService.getSelectedRows().has(row);
  }
  selectedRow = (row: Character): void => {
    console.log(row)
    this.selectionService.toggleRow(row);
  }

}
