import { Component, computed, effect, inject, Input, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetDetailsService } from '../../../core/providers/get-details.service';
import { IDetailsResponse, IEpisode, ILocation, IOrigin } from '../../models/details.model';
import { Character } from '../../models/character.model';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {

  @Input() detailsResolver!: IDetailsResponse[];

  getDetailsService = inject(GetDetailsService);

  details$ = computed(()=>{
    console.log(this.detailsResolver)
    return this.detailsResolver;
  })
  details$$ = signal(this.detailsResolver);

  constructor() {
    effect(() => {

    });

  }
  ngOnInit(): void {
    console.log(this.detailsResolver);
    console.log(this.details$());
    // this.detailsResolver.map(i=>console.log(i.character.name))
    console.log(this.details$$());

  }

}
