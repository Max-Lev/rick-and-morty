import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, DestroyRef, effect, inject, signal } from '@angular/core';
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
import { DIALOG_TYPE_ENUM } from '../../../shared/models/status.enum';
import { LiveSearchDialogComponent } from '../../../shared/components/live-search-dialog/live-search-dialog.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
// import { MatFormFieldControl } from '@angular/material/form-field';
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

  destroy$ = inject(DestroyRef);

  readonly dialog = inject(MatDialog);

  constructor() {
    effect(() => {
      // console.log(this.selectedSignal$())
      // console.log(this.selectedView())
      // console.log(this.selectedCount())
    });
    setTimeout(() => {
      this.openDialogHandler({ value: 'Search By Name', dialogType: 2 })
    }, 1000);
  }

  toggleView(view: string) {
    this.selectionService.selectedViewSignal$.set(view);
  }

  openDialogHandler(action: { value: string, dialogType: DIALOG_TYPE_ENUM }) {
    console.log('openDialogHandler: ', action.value);
    if (action.dialogType === DIALOG_TYPE_ENUM.filter) {
      this.openFilterDialog(action.value);
    } else if (action.dialogType === DIALOG_TYPE_ENUM.live) {
      this.openLiveSearchDialog(action.value);
    }
  }

  openFilterDialog(title: string) {

    const dialogRef = this.dialog.open(FilterDialogComponent, {
      restoreFocus: false,
      data: {
        title: title
      },
      width: '25%',
      height: '35%'
    });

    // Manually restore focus to the menu trigger since the element that
    // opens the dialog won't be in the DOM any more when the dialog closes.
    dialogRef.afterClosed().pipe(takeUntilDestroyed(this.destroy$)).subscribe((dialogValue: { action: string, query: { name: string, status: string } }) => {
      if (dialogValue.action === 'search') {
        console.log('search: ', dialogValue);
        this.selectionService.setFilter({ ...dialogValue.query }); // inject and call
      } else {
        return;
      }

      // this.menuTrigger().focus()
    });
  }

  openLiveSearchDialog(title: string) {
    const dialogRef = this.dialog.open(LiveSearchDialogComponent, {
      restoreFocus: false,
      data: {
        title: title
      },
      width: '25%',
      height: '35%'
    });

  }

}
