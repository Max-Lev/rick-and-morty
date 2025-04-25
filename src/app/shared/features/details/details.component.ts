import { Component, computed, effect, inject, Input, OnInit, signal } from "@angular/core";
import { GetDetailsService } from "../../../core/providers/get-details.service";
import { IDetailsResponse } from "../../models/details.model";
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

  @Input() detailsResolver!: IDetailsResponse;
  getDetailsService = inject(GetDetailsService);

  details$ = computed(() => this.detailsResolver);

  displayedColumns: string[] = ['expand', 'name', 'image', 'price', 'category', 'rating', 'inventoryStatus'];
  // displayedColumns2: string[] = ['expand', 'name', 'image', 'price', 'category', 'rating', 'inventoryStatus'];
  expandedRows: { [key: number]: boolean } = {};
  expandedRows2: { [key: number]: boolean } = {};

  // Sample data
  products: Product[] = [
    {
      id: 1,
      name: 'Hydrogen',
      image: 'hydrogen.png',
      price: 1.008,
      category: 'Element',
      rating: 4.5,
      inventoryStatus: 'In Stock',
      orders: [
        { id: 1, customer: 'John Doe', date: '2023-04-01', amount: 100, status: 'Shipped' },
        { id: 2, customer: 'Jane Smith', date: '2023-04-02', amount: 150, status: 'Pending' }
      ],
      location: [
        { id: 1, customer: 'John Doe', date: '2023-04-01', amount: 100, status: 'Shipped',status2: 'Pending' },
        { id: 2, customer: 'Jane Smith', date: '2023-04-02', amount: 150, status: 'Pending',status2: 'Pending' }
      ]
    }
  ];

  ngOnInit(): void {
    console.log(this.detailsResolver);
    console.log(this.details$());
  }

  toggleRow(product: Product) {
    debugger
    this.expandedRows[product.id] = !this.expandedRows[product.id];
    this.expandedRows2[product.id] = !this.expandedRows2[product.id];
  }

  expandAll() {
    this.products.forEach(product => {
      this.expandedRows[product.id] = true;
    });
  }

  collapseAll() {
    this.products.forEach(product => {
      this.expandedRows[product.id] = false;
    });
  }
}
