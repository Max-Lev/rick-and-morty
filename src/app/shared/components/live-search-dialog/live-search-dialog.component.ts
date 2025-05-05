import { AfterViewInit, Component, DestroyRef, effect, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { STATUS_OPTIONS } from '../../models/status.enum';
import { SelectComponent } from '../select/select.component';
import { NameSearchComponent } from '../name-search/name-search.component';
import { debounceTime, distinctUntilChanged, EMPTY, switchMap, tap } from 'rxjs';
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
    name: new FormControl<string>('', [Validators.minLength(3)]),
    status: new FormControl<string | null>('')
  });

  filterFormSignal = toSignal(this.form.valueChanges, { initialValue: this.form.getRawValue() });

  destroy$ = inject(DestroyRef);

  constructor() {
    // effect(()=>{
    // console.log(this.filterFormSignal())
    toObservable(this.filterFormSignal).pipe(
        debounceTime(1000),
        distinctUntilChanged((prev, curr) =>prev?.name === curr?.name && prev?.status === curr?.status),
        tap(() => {
          // console.log('Form validity:', this.form.valid);
        }),
        switchMap((val) => {
          const name = val?.name ?? '';
          const status = val?.status ?? '';

          if (this.form.valid && name.length >= 3) {
            // console.log('Request triggered with:', { name, status });
            this.selectionService.setFilter({ name, status });
            return this.selectionService.filter$;
          } else {
            // console.log('not valid');
            return EMPTY;
          }
        }),
        takeUntilDestroyed(this.destroy$)
      ).subscribe(res => {
        // console.log('Request triggered with:', res);
      })
  
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
