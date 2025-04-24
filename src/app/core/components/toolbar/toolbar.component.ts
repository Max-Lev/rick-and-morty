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
import { DialogConfigService } from '../../providers/dialog-config.service';
import { IDialogHandler } from '../../../shared/models/dialog.model';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-toolbar',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatToolbar,
    ToolbarMenuComponent,
    MatBadgeModule,
    MatTooltipModule,
    RouterModule,
    // ActivatedRoute
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

  dialogService = inject(DialogConfigService);

  activatedRoute = inject(ActivatedRoute);

  router = inject(Router);

  constructor() {
    effect(() => {
      console.log(this.selectionService.selectedRows())
      // console.log(this.selectedView())
    });
    // setTimeout(() => {
    //   this.openDialogHandler({ value: 'Search By Name', dialogType: 1 })
    // }, 1000);
  }

  toggleView(view: string) {
    this.selectionService.selectedViewSignal$.set(view);
  }

  openDialogHandler(dialogAction: IDialogHandler) {
    this.dialogService.openDialogAction(dialogAction);
  }

  clearSelection(){
    this.selectionService.clearSelection();
  }

  navigateDetails(){
    const selectedIDs = this.selectionService.selectedRowsIDs();
    this.router.navigateByUrl('details',{state: {selectedIDs}});
  }


}
