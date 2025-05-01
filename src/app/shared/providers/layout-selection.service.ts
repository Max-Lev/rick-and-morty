import { Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { LAYOUT_TYPE_ENUM } from '../models/status.enum';

type LayoutSize = { type: string; };

@Injectable({
  providedIn: 'root'
})
export class LayoutSelectionService {

  private layoutType = signal<LayoutSize>({ type: LAYOUT_TYPE_ENUM.DESKTOP });

  layoutsOptions = [
    {
      type: LAYOUT_TYPE_ENUM.DESKTOP, icon: 'laptop'
    },
    {
      type: LAYOUT_TYPE_ENUM.TABLET, icon: 'tablet_mac'
    },
    {
      type: LAYOUT_TYPE_ENUM.MOBILE, icon: 'stay_primary_portrait'
    },
  ];
  activeLayout = signal(0);

  constructor() { }

  setLayoutType(type: string): void {
    this.layoutType.set({ type });

  }

  get getLayoutType(): Signal<LayoutSize> {
    return this.layoutType;
  }


  cycleLayout(): { type: LAYOUT_TYPE_ENUM; icon: string; } {
    const index = (this.activeLayout() + 1) % this.layoutsOptions.length;
    this.activeLayout.set(index);
    this.setLayoutType(this.layoutsOptions[this.activeLayout()].type);
    return this.layoutsOptions[this.activeLayout()];
  }


}
