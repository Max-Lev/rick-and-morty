import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { SelectionService } from '../../shared/providers/selection.service';

export const isSelectedGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
  
  const selectionService = inject(SelectionService);
  const router = inject(Router);

  const selectedIDs = selectionService.selectedRowsIDs();
  if (selectedIDs.length > 0) {
    return true;
  }
  
  router.navigate(['/characters']);
  return false;
};
