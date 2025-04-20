import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, effect, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { ToolbarMenuComponent } from '../toolbar-menu/toolbar-menu.component';
import { MatBadgeModule } from '@angular/material/badge';
import { SelectionService } from '../../../shared/providers/selection.service';
import {
  MatDialog,
} from '@angular/material/dialog';
import { FilterDialogComponent } from '../../../shared/components/filter-dialog/filter-dialog.component';
@Component({
  selector: 'app-toolbar',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatToolbar,
    ToolbarMenuComponent,
    MatBadgeModule,
  ],
  standalone: true,
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent {

  selectionService = inject(SelectionService);

  selectedCount = computed(() => this.selectionService.selectedCount$());

  selectedViewSignal = this.selectionService.selectedViewSignal$;

  // cdr = inject(ChangeDetectorRef);

  readonly dialog = inject(MatDialog);

  // characterService = inject(SelectionService);



  constructor() {
    effect(() => {
      // console.log(this.selectedSignal$())
      // console.log(this.selectedView())
      console.log(this.selectedCount())
    });
    setTimeout(() => {
      // this.openDialogHandler({value:'Filter By Status & Name'})
    }, 0);
  }

  toggleView(view: string) {
    this.selectionService.selectedViewSignal$.set(view);
  }

  openDialogHandler(action: { value: string }) {
    console.log('openDialogHandler: ', action.value);
    const dialogRef = this.dialog.open(FilterDialogComponent, {
      restoreFocus: false,
      data: {
        title: action.value
      },
      width: '50%',
      height: '50%'
    });

    // Manually restore focus to the menu trigger since the element that
    // opens the dialog won't be in the DOM any more when the dialog closes.
    dialogRef.afterClosed().subscribe((val: {
      action: string,query: { name: string, status: string }
    }) => {
      console.log('close: ', val);
      this.selectionService.setFilter({...val.query}); // inject and call
      // this.menuTrigger().focus()
    });
  }

}
