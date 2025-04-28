import { Injectable, Signal, signal, WritableSignal } from '@angular/core';

type LayoutSize = {
  type: string;
  width: number;
  height: number;
};

@Injectable({
  providedIn: 'root'
})
export class LayoutSelectionService {

  // constructor() { }

  // layoutSize = signal({type:'iPad',width:1024,height:768});
  // private layoutSize = signal({ type: '', width: 0, height: 0 });

  // layoutSize$ = this.layoutSize;

  // setLayoutSize(type: string, width: number, height: number){
  //   this.layoutSize.set({ type: type, width: width, height: height });
  //   console.log(this.layoutSize())
  // }

  // getLayoutSize(): Signal<{
  //   type: string;
  //   width: number;
  //   height: number;
  // }> {
  //   return this.layoutSize$;
  // }

  private layoutSize = signal<LayoutSize>({ type: 'desktop', width: 0, height: 0 });

  constructor() {}

  setLayoutSize(type: string, width: number, height: number): void {
    this.layoutSize.set({ type, width, height });
    console.log(this.layoutSize());
  }

  get layoutSizeSignal(): Signal<LayoutSize> {
    return this.layoutSize;
  }


}
