import { Component, computed, effect, inject, Input, OnInit, signal } from "@angular/core";
import { GetDetailsService } from "../../../core/providers/get-details.service";
import { IDetail, IDetailsResponse } from "../../models/details.model";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from "@angular/common";
import { MatIcon } from "@angular/material/icon";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  rating: number;
  inventoryStatus: string;
  image: string;
  orders: Order[];
  location: Location[];
}

interface Order {
  id: number;
  customer: string;
  date: string;
  amount: number;
  status: string;
}
interface Location {
  id: number;
  customer: string;
  date: string;
  amount: number;
  status: string;
  status2: string;
}

@Component({
  selector: 'app-details',
  imports: [
    MatTableModule,
    MatExpansionModule,
    CommonModule,
    MatIcon
  ],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  @Input() charactersDetails!: IDetailsResponse;
  getDetailsService = inject(GetDetailsService);

  details$ = computed(() => this.charactersDetails);

  displayedColumns = ['image', 'name', 'species', 'status', 'gender'];
  locationColumns = ['id','name', 'dimension'];
  originColumns = ['id','name', 'dimension'];
  episodeColumns = ['episode', 'name'];

  expandedRows: { [key: number]: boolean } = {};
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


}
