import { Component, effect, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DetailsCharacterList, IDetail, IDetailsResponse } from '../../models/details.model';
import { JsonPipe, NgStyle } from '@angular/common';
import { ColorPipe } from '../../pipes/color.pipe';
import { IsEmptyPipe } from '../../pipes/is-empty.pipe';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
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
    JsonPipe
  ],
  templateUrl: './details-card.component.html',
  styleUrl: './details-card.component.scss'
})
export class DetailsCardComponent {

  locationColumns = ['id', 'name', 'dimension'];
  originColumns = ['id', 'name', 'dimension'];
  episodeColumns = ['id','episode', 'name'];

  // character = input.required<IDetail>();
  character = input.required<DetailsCharacterList>();

  readonly panelOpenState = signal(true);

  constructor(){
    effect(()=>{
      console.log(this.character())
    })
  }

}
