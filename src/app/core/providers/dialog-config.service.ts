import { DestroyRef, inject, Injectable, OnDestroy } from '@angular/core';
import { FilterDialogComponent } from '../../shared/components/dialogs/filter-dialog/filter-dialog.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { SelectionService } from '../../shared/providers/selection.service';
import { LiveSearchDialogComponent } from '../../shared/components/dialogs/live-search-dialog/live-search-dialog.component';
import { DIALOG_TYPE_ENUM } from '../../shared/models/status.enum';
import { IDialogHandler } from '../../shared/models/dialog.model';
import { IFilterPayload } from '../../shared/models/character.model';

@Injectable({
  providedIn: 'root'
})
export class DialogConfigService implements OnDestroy {

  readonly dialog = inject(MatDialog);
  selectionService = inject(SelectionService);
  destroy$ = inject(DestroyRef);

  openDialogAction({ title, dialogType }: IDialogHandler) {

    if (dialogType === DIALOG_TYPE_ENUM.filter) {
      this.openFilterDialog(title);
    } else if (dialogType === DIALOG_TYPE_ENUM.search) {
      this.openLiveSearchDialog(title);
    }
  }

  openFilterDialog(title: string) {

    const dialogRef = this.dialog.open(FilterDialogComponent, {
      restoreFocus: false,
      data: { title: title },
      width: '40%',
    });

    // Manually restore focus to the menu trigger since the element that
    // opens the dialog won't be in the DOM any more when the dialog closes.
    dialogRef.afterClosed().pipe(takeUntilDestroyed(this.destroy$))
      .subscribe((dialogValue: { action: string, query: IFilterPayload }) => {
        if (dialogValue?.action === DIALOG_TYPE_ENUM.filter) {
          // this.selectionService.setFilter({ ...dialogValue.query }); // inject and call
          this.selectionService.localSearchFiltersPayload$.set({ ...dialogValue.query }); // inject and call
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
      width: '40%',
    });


    dialogRef.afterClosed().pipe(takeUntilDestroyed(this.destroy$))
    .subscribe((dialogValue: { action: string, query: IFilterPayload }) => {
      if (dialogValue?.action === DIALOG_TYPE_ENUM.search) {
        // this.selectionService.setFilter({ ...dialogValue.query }); // inject and call
        this.selectionService.localSearchFiltersPayload$.set({ ...dialogValue.query }); // inject and call
      } else {
        return;
      }
      // this.menuTrigger().focus()
    });


  }

  ngOnDestroy(): void {

  }

}
