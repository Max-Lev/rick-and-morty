import { AfterViewInit, Component, computed, effect, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { STATUS_ENUM, STATUS_OPTIONS } from '../../models/status.enum';
import { toSignal } from '@angular/core/rxjs-interop';
import { SelectComponent } from '../select/select.component';
import { NameSearchComponent } from '../name-search/name-search.component';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
@Component({
  selector: 'app-filter-dialog',
  imports: [
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatButtonModule,
    ReactiveFormsModule,
    SelectComponent,
    NameSearchComponent,
    MatFormFieldModule
  ],

  templateUrl: './filter-dialog.component.html',
  styleUrl: './filter-dialog.component.scss',

})
export class FilterDialogComponent implements AfterViewInit {
  statusOptions = STATUS_OPTIONS
  incomingData = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<FilterDialogComponent>);

  form = new FormGroup({
    name: new FormControl<string>('', 
      // {validators: [Validators.required, Validators.minLength(3)]}
    ),
    status: new FormControl<string | null>(''),
  });

  filterFormSignal = toSignal(this.form.valueChanges, { initialValue: this.form.getRawValue() });

  // filterForm$ = signal(this.form);

  // charactersService = inject(CharactersService);

  // selectionService = inject(SelectionService);

  constructor() {
    effect(() => {
      // console.log('incomingData:', this.incomingData);
      // console.log('statusOptions:', this.statusOptions);
      // console.log(this.filterFormSignal())
      // console.log(this.filterForm$())
    });

  }
  ngAfterViewInit(): void {

    // this.form.valueChanges.subscribe(val => {
    //   console.log('val', val)
    // });

  }


  search() {
    // IFilterPayload
    this.dialogRef.close({ action: 'search', query: this.filterFormSignal() });
  }

  onSubmit(form: FormGroup) {
    // console.log(form.value);
  }

}
