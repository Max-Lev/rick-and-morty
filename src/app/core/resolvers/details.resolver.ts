import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';

export const detailsResolver: ResolveFn<boolean> = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
  console.log(route)
  console.log(state)
  return true;
};
