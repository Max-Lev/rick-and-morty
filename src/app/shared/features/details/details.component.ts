import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, effect, inject, Input, OnInit, QueryList, signal, ViewChild, ViewChildren } from "@angular/core";
import { GetDetailsService } from "../../../core/providers/get-details.service";
import { DetailsCharacterList, IDetail, IDetailsResponse } from "../../models/details.model";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule, NgSwitch, NgSwitchCase } from "@angular/common";
import { MatIcon } from "@angular/material/icon";
import { COLUMNS, DETAILS_COLUMNS } from "../characters/columns.config";
import { Character, ColumnConfig, ICharacterColumns } from "../../models/character.model";
import { RowComponent } from "../../components/list-view/template/row/row.component";
import { NameRowComponent } from "../../components/list-view/template/name-row/name-row.component";
import { ColorPipe } from "../../pipes/color.pipe";
import { IsEmptyPipe } from "../../pipes/is-empty.pipe";
import { DetailsCardComponent } from "../../components/details-card/details-card.component";
import { LayoutSelectionService } from "../../providers/layout-selection.service";
import { SelectionService } from "../../providers/selection.service";
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';


@Component({
  selector: 'app-details',
  imports: [
    MatTableModule,
    MatExpansionModule,
    CommonModule,
    RowComponent,
    NameRowComponent,
    ColorPipe, IsEmptyPipe,
    DetailsCardComponent,
    MatPaginatorModule,
    NgSwitchCase
  ],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsComponent implements OnInit, AfterViewInit {

  @Input() charactersDetails!: IDetailsResponse;
  // getDetailsService = inject(GetDetailsService);

  details$ = computed(() => this.charactersDetails);

  locationColumns = ['id', 'name', 'dimension'];
  originColumns = ['id', 'name', 'dimension'];
  episodeColumns = ['id','episode', 'name'];

  expandedRows: { [key: number]: boolean } = {};

  columns: ColumnConfig<ICharacterColumns>[] = DETAILS_COLUMNS;
  displayedColumns = this.columns.map(column => column.columnDef);

  layoutSelectionService = inject(LayoutSelectionService);
  layout = computed(() => this.layoutSelectionService.getLayoutType());

  selectionService = inject(SelectionService);
  selectedViewSignal$ = this.selectionService.selectedViewSignal$;

  episodeDataSources: { [id: number]: MatTableDataSource<any> } = {};
  paginators: { [id: number]: MatPaginator } = {};
  @ViewChildren('paginator') paginatorsViewChildren!: QueryList<MatPaginator>;
  
  combineDataList = signal<DetailsCharacterList[]>([]);

  cdr = inject(ChangeDetectorRef);

  constructor() { 
    effect(() => {
      if (this.selectedViewSignal$() === 'list') {
        this.bindPaginators();
      }
    });
  }

  ngOnInit(): void {
    this.expandAllSubTables();
    this.setEpisodsodeDataSources();
    this.formatCharacterData();
  }

  ngAfterViewInit() {
    // this.bindPaginators();
    this.cdr.detectChanges();
  }

  formatCharacterData() {
    const combinedData = this.charactersDetails.map(({ character, location, origin, episodes }) => ({
      character: {
        ...character,
        locationId: location?.id ?? null,
        locationName: location?.name,
        locationDimension: location?.dimension,
        originId: origin?.id ?? null,
        originName: origin?.name,
        originDimension: origin?.dimension
      },
      episodes,
    }));
    this.combineDataList.set(combinedData);
    console.log('combinedData',this.combineDataList());
    return combinedData;
  }

  setEpisodsodeDataSources() {
    for (const character of this.charactersDetails) {
      const id = +character.character.id;
      this.episodeDataSources[id] = new MatTableDataSource(character.episodes);
    }
  }
  bindPaginators() {
    setTimeout(() => {
      this.paginatorsViewChildren.forEach((paginator, index) => {
        const id = +this.charactersDetails[index].character.id;
        this.episodeDataSources[id].paginator = paginator;
      });
    });
  }

  expandAllSubTables() {
    this.charactersDetails.forEach((character: IDetail) => {
      // this.expandedRows[+character.character.id] = false; // HIDE
      this.expandedRows[+character.character.id] = true; // SHOW ON INITIAL LOAD
    });
  }

  isExpandedRow = (index: number, element: IDetail): boolean => {
    return !!this.expandedRows[+element.character.id]; // Pure check without side effects
  };

  toggle(element: IDetail) {
    this.setEpisodsodeDataSources();
    this.bindPaginators();
    const id = element.character.id;
    this.expandedRows[+id] = !this.expandedRows[+id];
    // If using plain array, force change detection:
    this.charactersDetails = [...this.charactersDetails];

  }

  isSelected(row: Character): boolean {
    return false;
  }



}
