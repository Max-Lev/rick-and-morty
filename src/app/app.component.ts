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

  layout = computed(() => this.layoutSelectionService.getLayoutType())

  constructor() {

  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {

  }





}
