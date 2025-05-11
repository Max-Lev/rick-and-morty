import { RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';

export class CustomRouteReuseStrategy implements RouteReuseStrategy {
  private storedRoutes = new Map<string, DetachedRouteHandle>();

  // Determines if the route should be detached for later reuse
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    // Only detach routes marked with data.reuseRoute
    return route.data['reuseRoute'] === true;
  }

  // Stores the detached route
  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    const routePath = this.getRoutePathIdentifier(route);
    if (routePath && handle) {
      this.storedRoutes.set(routePath, handle);
    }
  }

  // Determines if the route should be reattached
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    const routePath = this.getRoutePathIdentifier(route);
    return !!routePath && this.storedRoutes.has(routePath);
  }

  // Retrieves the previously stored route
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    const routePath = this.getRoutePathIdentifier(route);
    if (!routePath) {
      return null;
    }
    return this.storedRoutes.get(routePath) || null;
  }

  // Determines if the same route should be reused
  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    // Default reuse strategy behavior - reuse if the route config is the same
    return future.routeConfig === curr.routeConfig;
  }

  // Helper method to create a route identifier
  private getRoutePathIdentifier(route: ActivatedRouteSnapshot): string | null {
    // Gets the route's path configuration
    if (!route.routeConfig) {
      return null;
    }
    // Create an identifier based on the route's path and any fixed params
    const path = route.routeConfig.path;
    return path ? path : null;
  }
}