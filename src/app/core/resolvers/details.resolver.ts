import { GetDetailsService } from '../providers/get-details.service';
import { inject } from '@angular/core';
import { IDetailsResponse } from '../../shared/models/details.model';
import { ResolveFn, Router } from '@angular/router';

export const detailsResolver: ResolveFn<IDetailsResponse> = () => {
  
  const router = inject(Router);
  const nav = router.getCurrentNavigation();
  const selectedIDs:string[] = nav?.extras.state?.['selectedIDs'] ?? [];
  const getDetailsService = inject(GetDetailsService).getDetailsQuery(selectedIDs);

  return getDetailsService;
};
