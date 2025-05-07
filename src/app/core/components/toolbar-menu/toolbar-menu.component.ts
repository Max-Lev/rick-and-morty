import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenu, MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { DIALOG_TYPE_ENUM } from '../../../shared/models/status.enum';
import { IDialogHandler } from '../../../shared/models/dialog.model';

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

@Output() openDialogAction = new EventEmitter<IDialogHandler>();

  menuOptions = [
    {
      label: 'Filter By Status & Name',
      icon: 'filter_alt',
      type:DIALOG_TYPE_ENUM.filter,
      action: (): void => this.openDialog({title:this.menuOptions[0].label,dialogType:DIALOG_TYPE_ENUM.filter})
    },
    {
      label: 'Search By Name',
      icon: 'search',
      type:DIALOG_TYPE_ENUM.search,
      action: (): void => this.openDialog({title:this.menuOptions[1].label,dialogType:DIALOG_TYPE_ENUM.search})
    }
  ];

  openDialog(dialogAction:IDialogHandler) {
    this.openDialogAction.emit(dialogAction);
  }

}
