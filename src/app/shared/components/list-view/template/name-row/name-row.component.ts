import { Component, Input, Pipe } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { ColorPipe } from '../../../../pipes/color.pipe';
import { Character, ColumnConfig, ICharacterColumns } from '../../../../models/character.model';

@Component({
  selector: 'name-row',
  imports: [
    MatTooltip,
    ColorPipe
  ],
  templateUrl: './name-row.component.html',
  styleUrl: './name-row.component.scss'
})
export class NameRowComponent {

  @Input({ required: true }) column!: ColumnConfig<ICharacterColumns>;

  @Input({ required: true }) row!: Character;
  
  isSelected(row: Character):string {
    return (!row.selected) ? 'SELECT CHARACTER' : '';
  }

}
