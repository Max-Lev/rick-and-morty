import { AfterViewInit, Component, DestroyRef, effect, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DIALOG_TYPE_ENUM, STATUS_OPTIONS } from '../../models/status.enum';
import { SelectComponent } from '../select/select.component';
import { NameSearchComponent } from '../name-search/name-search.component';
import { debounceTime, distinctUntilChanged, EMPTY, filter, switchMap, tap } from 'rxjs';
import { SelectionService } from '../../providers/selection.service';
import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-live-search-dialog',
  imports: [
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    SelectComponent,
    NameSearchComponent,

  ],
  templateUrl: './live-search-dialog.component.html',
  styleUrl: './live-search-dialog.component.scss'
})
export class LiveSearchDialogComponent implements AfterViewInit {

  statusOptions = STATUS_OPTIONS;
  incomingData = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<LiveSearchDialogComponent>);
  selectionService = inject(SelectionService);

  form = new FormGroup({
    name: new FormControl<string | null>(null, [Validators.minLength(3)]),
    status: new FormControl<string | null>(null)
  });

  filterFormSignal = toSignal(this.form.valueChanges, { initialValue: this.form.getRawValue() });

  destroy$ = inject(DestroyRef);

  constructor() {
    this.setupFilterFormListener();
  }

  private setupFilterFormListener(): void {
    toObservable(this.filterFormSignal)
      .pipe(
        debounceTime(1000),
        distinctUntilChanged((prev, curr) =>prev?.name === curr?.name && prev?.status === curr?.status),
        filter(() => this.form.valid && this.form.touched),
        tap((val: Partial<{ name: string | null; status: string | null; }>) => {
          const name = val?.name ?? null;
          const status = val?.status ?? null;
          this.selectionService.setFilter({ name, status });

          const formValues = this.filterFormSignal();
          this.selectionService.setClearFilterBtnState(formValues, DIALOG_TYPE_ENUM.search);
        }),
        switchMap(() => this.selectionService.filter$),
        takeUntilDestroyed(this.destroy$)
      )
      .subscribe({
        next: (res) => {
          // console.log('Request triggered with:', res);
        },
        error: (err) => console.error('Filter subscription error:', err)
      });
  }

  ngAfterViewInit(): void {

  }


  search() {
    this.dialogRef.close()
  }

  onSubmit(form: FormGroup) {
    // console.log(form.value);
  }

}
