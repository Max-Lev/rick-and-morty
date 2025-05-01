import { Component, computed, effect, inject, Input, OnInit, signal } from "@angular/core";
import { GetDetailsService } from "../../../core/providers/get-details.service";
import { IDetail, IDetailsResponse } from "../../models/details.model";
import { MatTableModule } from "@angular/material/table";
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from "@angular/common";
import { MatIcon } from "@angular/material/icon";
import { COLUMNS } from "../characters/columns.config";
import { Character, ColumnConfig, ICharacterColumns } from "../../models/character.model";
import { RowComponent } from "../../components/list-view/template/row/row.component";
import { NameRowComponent } from "../../components/list-view/template/name-row/name-row.component";
import { ColorPipe } from "../../pipes/color.pipe";
import { IsEmptyPipe } from "../../pipes/is-empty.pipe";
import { DetailsCardComponent } from "../../components/details-card/details-card.component";



@Component({
  selector: 'app-details',
  imports: [
    MatTableModule,
    MatExpansionModule,
    CommonModule,
    RowComponent,
    NameRowComponent,
    ColorPipe,IsEmptyPipe,
    DetailsCardComponent
  ],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  @Input() charactersDetails!: IDetailsResponse;
  getDetailsService = inject(GetDetailsService);

  details$ = computed(() => this.charactersDetails);

  locationColumns = ['id','name', 'dimension'];
  originColumns = ['id','name', 'dimension'];
  episodeColumns = ['episode', 'name'];

  expandedRows: { [key: number]: boolean } = {};

  columns: ColumnConfig<ICharacterColumns>[] = COLUMNS;
  displayedColumns = this.columns.map(column => column.columnDef);

  ngOnInit(): void {
    this.charactersDetails.forEach((character: IDetail) => {
      this.expandedRows[+character.character.id] = false; // Remove + to keep as string
    });
  }

  isExpandedRow = (index: number, element: IDetail): boolean => {
    return !!this.expandedRows[+element.character.id]; // Pure check without side effects
  };

  toggle(element: IDetail) {
    const id = element.character.id;
    this.expandedRows[+id] = !this.expandedRows[+id];
    // If using plain array, force change detection:
    this.charactersDetails = [...this.charactersDetails];
  }

  isSelected(row: Character): boolean {
    return false;
  }



}
