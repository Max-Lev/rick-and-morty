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
import { DialogConfigService } from '../../providers/dialog-config.service';
import { IDialogHandler } from '../../../shared/models/dialog.model';
import {MatTooltipModule} from '@angular/material/tooltip';
import {Router, RouterModule } from '@angular/router';
import { LayoutSelectionService } from '../../../shared/providers/layout-selection.service';
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

  layoutSelectionService = inject(LayoutSelectionService);
  tabletView(type:string){
      this.layoutSelectionService.setLayoutSize(type,720,1200)
  }

}
