import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatMenu, MatMenuModule, MatMenuTrigger} from '@angular/material/menu';

@Component({
  selector: 'app-toolbar-menu',
  imports: [
    MatMenuTrigger,
    MatMenu,
    MatIconModule,
    MatButtonModule, 
    MatMenuModule
  ],
  standalone:true,
  templateUrl: './toolbar-menu.component.html',
  styleUrl: './toolbar-menu.component.scss'
})
export class ToolbarMenuComponent {
  
}
