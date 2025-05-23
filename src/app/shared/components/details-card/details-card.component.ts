import { Component, effect, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DetailsCharacterList, EPISODE_COLUMNS, IDetail, IDetailsResponse, LOCATION_COLUMNS, ORIGIN_COLUMNS } from '../../models/details.model';
import { JsonPipe, NgStyle } from '@angular/common';
import { ColorPipe } from '../../pipes/color.pipe';
import { IsEmptyPipe } from '../../pipes/is-empty.pipe';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { GenderPipe } from '../../pipes/gender.pipe';
@Component({
  selector: 'app-details-card',
  imports: [
    MatCardModule,
    MatButtonModule,
    NgStyle,
    ColorPipe,
    IsEmptyPipe,
    MatExpansionModule,
    MatTableModule,
    GenderPipe
  ],
  templateUrl: './details-card.component.html',
  styleUrl: './details-card.component.scss'
})
export class DetailsCardComponent {

  locationColumns = LOCATION_COLUMNS;
  originColumns = ORIGIN_COLUMNS;
  episodeColumns = EPISODE_COLUMNS;

  character = input.required<DetailsCharacterList>();

  readonly panelOpenState = signal(true);

  constructor(){
 
  }

}
