import { AfterViewInit, computed, effect, inject, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { ToolbarComponent } from './core/components/toolbar/toolbar.component';
import { RouterOutlet } from '@angular/router';
import { LayoutSelectionService } from './shared/providers/layout-selection.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    ToolbarComponent,
    RouterOutlet,
    NgClass
  ],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, AfterViewInit {

  layoutSelectionService = inject(LayoutSelectionService);

  layout = computed(()=>{
    return this.layoutSelectionService.layoutSizeSignal();
  })

  constructor(){
    effect(()=>{
      console.log(this.layoutSelectionService.layoutSizeSignal());
      console.log(this.layout());
    });
  }

  ngOnInit(): void {

    // This function is called when the component is initialized
  }

  ngAfterViewInit() {

  }





}
