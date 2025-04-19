import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenu, MatMenuModule, MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-toolbar-menu',
  imports: [
    MatMenuTrigger,
    MatMenu,
    MatIconModule,
    MatButtonModule,
    MatMenuModule
  ],
  standalone: true,
  templateUrl: './toolbar-menu.component.html',
  styleUrl: './toolbar-menu.component.scss'
})
export class ToolbarMenuComponent {

@Output() openDialogAction = new EventEmitter<{value: string}>();

  menuOptions = [
    {
      label: 'Filter By Status & Name',
      icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968292.png',
      action: (): void => this.openDialog(this.menuOptions[0].label)
    },
    {
      label: 'Option 2',
      icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968292.png',
      action: () => this.selectedMenuOption(this.menuOptions[1].label)
    }
  ];

  selectedMenuOption(label: string) {
    console.log('Option 1 clicked', label)
  }

  openDialog(label: string) {
    this.openDialogAction.emit({value:label})
  }

}
