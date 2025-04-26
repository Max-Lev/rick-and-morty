import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Character, ColumnConfig, ICharacterColumns } from '../../../../models/character.model';
import { ColorPipe } from '../../../../pipes/color.pipe';

@Component({
  selector: 'app-row',
  imports: [
    // ColorPipe
  ],
  templateUrl: './row.component.html',
  styleUrl: './row.component.scss'
})
export class RowComponent implements OnChanges {

  @Input({ required: true }) row!: Character;

  @Input({required: true}) column!:ColumnConfig<ICharacterColumns>;

  @Input() color!:string | boolean;

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
  }



}
