import { Component, AfterViewInit, inject, DestroyRef, effect } from "@angular/core";
import { toSignal, toObservable, takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogActions, MatDialogClose, MatDialogContent, MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { debounceTime, distinctUntilChanged, filter, tap, switchMap } from "rxjs";
import { STATUS_OPTIONS, DIALOG_TYPE_ENUM, SPICIES_OPTIONS, GENDER_OPTIONS, CHARACTER_TYPES } from "../../../models/status.enum";
import { SelectionService } from "../../../providers/selection.service";
import { SelectComponent } from "../../form-controls/select/select.component";
import { NameSearchComponent } from "../../form-controls/name-search/name-search.component";
import { AutoCompleteComponent } from "../../form-controls/auto-complete/auto-complete.component";
import { IFilterPayload } from "../../../models/character.model";

@Component({
  selector: 'app-live-search-dialog',
  imports: [
    MatDialogActions,
    MatDialogContent,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    SelectComponent,
    NameSearchComponent,
    AutoCompleteComponent,
    
  ],
  templateUrl: './live-search-dialog.component.html',
  styleUrl: './live-search-dialog.component.scss'
})
export class LiveSearchDialogComponent implements AfterViewInit {

  statusOptions = STATUS_OPTIONS;
  speciesOptions = SPICIES_OPTIONS;
  genderOptions = GENDER_OPTIONS;
  typeOptions = CHARACTER_TYPES;
  incomingData = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<LiveSearchDialogComponent>);
  selectionService = inject(SelectionService);

  form = new FormGroup({
    name: new FormControl<string | null>(null, [Validators.minLength(3)]),
    status: new FormControl<string | null>(null),
    species: new FormControl<string | null>(null),
    gender: new FormControl<string | null>(null),
    type: new FormControl<string | null>(null)
  });

  filterFormSignal = toSignal(this.form.valueChanges, { initialValue: this.form.getRawValue() });

  destroy$ = inject(DestroyRef);

  

  constructor() {
    this.setupFilterFormListener();

  }

  private setupFilterFormListener(): void {
    toObservable(this.filterFormSignal).pipe(
      debounceTime(1000),
      // distinctUntilChanged((prev, curr) => prev?.name === curr?.name && prev?.status === curr?.status),
      // distinctUntilChanged(areFiltersEqual),
      filter(() => this.form.valid && this.form.touched),
      tap((filters: Partial<IFilterPayload> | null) => {
      
        const safeFilters: IFilterPayload = {
          name: filters?.name ?? null,
          status: filters?.status ?? null,
          gender: filters?.gender ?? null,
          species: filters?.species ?? null,
          type: filters?.type ?? null,
        };

        this.selectionService.setFilter(safeFilters);

        const formValues = this.filterFormSignal();
        
        this.selectionService.setClearFilterBtnState(formValues, DIALOG_TYPE_ENUM.search);
      }),
      switchMap(() => this.selectionService.filter$),
      takeUntilDestroyed(this.destroy$)
    )
      .subscribe({
        next: (res) => {
          
        },
        error: (err) => console.error('Filter subscription error:', err)
      });
  }

  ngAfterViewInit(): void {

  }


  close() {
    this.dialogRef.close({ action: DIALOG_TYPE_ENUM.search, query: this.filterFormSignal() });
  }
  

  onSubmit(form: FormGroup) {
    
  }

}
