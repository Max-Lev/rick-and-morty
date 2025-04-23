import { Component, effect, inject, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetDetailsService } from '../../../core/providers/get-details.service';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  activatedRoute = inject(ActivatedRoute);

  @Input() id: string[] = [];
  router = inject(Router);

  getDetailsService = inject(GetDetailsService);

  constructor() {
    effect(() => {
      console.log(this.activatedRoute.snapshot);
      console.log(this.id);
    });
    console.log(this.activatedRoute.snapshot);
    console.log(this.id);
    const nav = this.router.getCurrentNavigation();
    const selectedRows = nav?.extras.state?.['selectedRows'] ?? [];
    console.log('selectedRows: ', selectedRows);

    this.getDetailsService.getDetailsQuery(['1','2'])
    .subscribe(v=>{
      console.log(v);
    })


  }

}
