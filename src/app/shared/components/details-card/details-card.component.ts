import { Component, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { IDetail, IDetailsResponse } from '../../models/details.model';
import { NgStyle } from '@angular/common';
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
  ],
  templateUrl: './details-card.component.html',
  styleUrl: './details-card.component.scss'
})
export class DetailsCardComponent {

  locationColumns = ['id', 'name', 'dimension'];
  originColumns = ['id', 'name', 'dimension'];
  episodeColumns = ['id','episode', 'name'];

  character = input.required<IDetail>();

  readonly panelOpenState = signal(true);

}
