import { DestroyRef, inject, Injectable, OnDestroy } from '@angular/core';
import { FilterDialogComponent } from '../../shared/components/filter-dialog/filter-dialog.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { SelectionService } from '../../shared/providers/selection.service';
import { LiveSearchDialogComponent } from '../../shared/components/live-search-dialog/live-search-dialog.component';
import { DIALOG_TYPE_ENUM } from '../../shared/models/status.enum';

@Injectable({
  providedIn: 'root'
})
export class DialogService implements OnDestroy {


  readonly dialog = inject(MatDialog);
  selectionService = inject(SelectionService);
  destroy$ = inject(DestroyRef);

  openDialogAction(action: { value: string, dialogType: DIALOG_TYPE_ENUM }) {
    if (action.dialogType === DIALOG_TYPE_ENUM.filter) {
      this.openFilterDialog(action.value);
    } else if (action.dialogType === DIALOG_TYPE_ENUM.live) {
      this.openLiveSearchDialog(action.value);
    }
  }

  openFilterDialog(title: string) {

    const dialogRef = this.dialog.open(FilterDialogComponent, {
      restoreFocus: false,
      data: { title: title },
      width: '25%',
      height: '35%'
    });

    // Manually restore focus to the menu trigger since the element that
    // opens the dialog won't be in the DOM any more when the dialog closes.
    dialogRef.afterClosed().pipe(takeUntilDestroyed(this.destroy$))
      .subscribe((dialogValue: { action: string, query: { name: string, status: string } }) => {
        if (dialogValue?.action === 'search') {
          console.log('search: ', dialogValue);
          this.selectionService.setFilter({ ...dialogValue.query }); // inject and call
        } else {
          return;
        }

        // this.menuTrigger().focus()
      });
  }

  /**
   * type ahead search
   */
  openLiveSearchDialog(title: string) {
    const dialogRef = this.dialog.open(LiveSearchDialogComponent, {
      restoreFocus: false,
      data: { title: title },
      width: '25%',
      height: '35%',
    });
  }

  ngOnDestroy(): void {

  }

}
