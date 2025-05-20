import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, DestroyRef, effect, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { ToolbarMenuComponent } from '../toolbar-menu/toolbar-menu.component';
import { MatBadgeModule } from '@angular/material/badge';
import { SelectionService } from '../../../shared/providers/selection.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfigService } from '../../providers/dialog-config.service';
import { IDialogHandler } from '../../../shared/models/dialog.model';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { LayoutSelectionService } from '../../../shared/providers/layout-selection.service';
import { DIALOG_TYPE_ENUM, LAYOUT_TYPE_ENUM } from '../../../shared/models/status.enum';
import { filter, single } from 'rxjs';
import { NgClass, UpperCasePipe } from '@angular/common';
import { CharactersService } from '../../providers/characters.service';
import { EMPTY_FILTER } from '../../../shared/models/filter.model';
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
    UpperCasePipe,
    NgClass
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

  layoutSelectionService = inject(LayoutSelectionService);
  layoutIcon = signal<{ type: LAYOUT_TYPE_ENUM; icon: string; }>({ type: LAYOUT_TYPE_ENUM.DESKTOP, icon: 'laptop' });

  clearBtnIconDisabled = computed(() => !this.selectionService.getClearFilterBtnState());

  route = inject(ActivatedRoute);

  currentUrl = signal(this.router.url);

  backIconDisabled = computed(() => this.currentUrl() !== '/details');

  charactersService = inject(CharactersService);

  pageIndicator = computed(() => {
    const { activePage, count } = this.selectionService.pageIndicator();
    // console.log(activePage, count);
    const pageCalc = count && Math.ceil(count / 20);
    return {
      count,
      activePage:(activePage===null) ? pageCalc : activePage,
      pageCalc
    }
  });
  characterIndicator = computed(() => {
    // { loaded: number; count: number; }
    const {count,loaded} = this.selectionService.characterIndicator();
    // console.log(count,loaded,this.selectionService.characterIndicator());
    return{
      count,loaded
    }
  });

  constructor() {

    effect(() => {
      // console.log(this.pageIndicator())
      // console.log(this.characterIndicator())
    })

    // setTimeout(() => {
    //   this.openDialogHandler({ title: 'Search By Name', dialogType: DIALOG_TYPE_ENUM.search });
    //   // this.openDialogHandler({title:'Filter By Status & Name',dialogType:DIALOG_TYPE_ENUM.filter});
    // }, 1000);

    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => this.currentUrl.set(event.url));

  }

  toggleView(view: string) {
    this.selectionService.selectedViewSignal$.set(view);
    // this.selectionService.setView$(view);
    // this.selectionService.viewChangeActive.set(true);
  }

  openDialogHandler(dialogAction: IDialogHandler) {
    this.dialogService.openDialogAction(dialogAction);
  }

  clearSelectedCharacters() {
    this.selectionService.clearSelectedCharacters();
  }

  navigateDetails() {
    const selectedIDs = this.selectionService.selectedRowsIDs();
    this.router.navigateByUrl('details', { state: { selectedIDs } });
  }


  cycleLayout() {
    const layout: { type: LAYOUT_TYPE_ENUM; icon: string; } = this.layoutSelectionService.cycleLayout();
    this.layoutIcon.set(layout);
  }

  clearFilters() {
    //filter dialog
    // this.selectionService.localSearchFiltersPayload$.set({ name: null, status: null });
    this.selectionService.localSearchFiltersPayload$.set({ ...EMPTY_FILTER });
    // search dialog
    // this.selectionService.setFilter({ name: null, status: null });
    this.selectionService.setFilter({ ...EMPTY_FILTER });
    // clear button disabled
    this.selectionService.getClearFilterBtnState.set(false);
    //enable scroll after dialog filter
    this.selectionService.disableFilterNextScroll.set(false);

    this.selectionService.resetFilters.set(true);
  }

  navigateCharacters() {
    this.router.navigateByUrl('/characters');
  }

  nextPage() {
    this.selectionService.scrollNextActive.set(true);
  }

}
