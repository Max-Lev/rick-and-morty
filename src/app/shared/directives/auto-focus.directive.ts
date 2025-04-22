import { AfterViewInit, Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[appAutoFocus]'
})
export class AutofocusDirective implements AfterViewInit {
  
  el = inject(ElementRef)
  ngAfterViewInit() {
    setTimeout(() => {
      this.el.nativeElement.focus();
    }, 250);
  }
}
