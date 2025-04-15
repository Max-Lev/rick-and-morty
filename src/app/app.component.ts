import { AfterViewInit, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { ToolbarComponent } from './core/components/toolbar/toolbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    ToolbarComponent,
    RouterOutlet
  ],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, AfterViewInit {


  ngOnInit(): void {

  }

  ngAfterViewInit() {

  }





}
