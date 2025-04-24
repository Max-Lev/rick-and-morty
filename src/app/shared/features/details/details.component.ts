import { Component, computed, effect, inject, Input, OnInit, signal } from "@angular/core";
import { GetDetailsService } from "../../../core/providers/get-details.service";
import { IDetailsResponse } from "../../models/details.model";

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {

  @Input() detailsResolver!: IDetailsResponse;

  getDetailsService = inject(GetDetailsService);

  details$ = computed(()=>this.detailsResolver)

  constructor() {
    effect(() => {

    });

  }
  ngOnInit(): void {
    console.log(this.detailsResolver);
    console.log(this.details$());
  }

}
