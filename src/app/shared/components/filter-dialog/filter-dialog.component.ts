import { AfterViewInit, Component, computed, effect, forwardRef, inject, signal } from '@angular/core';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators, } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { STATUS_ENUM } from '../../models/status.enum';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatSelectModule } from '@angular/material/select';
import { CharactersService } from '../../../core/providers/characters.service';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';
import { SelectionService } from '../../providers/selection.service';
import { NgIf } from '@angular/common';
import { SelectComponent } from '../select/select.component';
@Component({
  selector: 'app-filter-dialog',
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
  ],

  templateUrl: './filter-dialog.component.html',
  styleUrl: './filter-dialog.component.scss',

})
export class FilterDialogComponent implements AfterViewInit {
  statusOptions = [{ key: STATUS_ENUM.Alive, value: 'Alive' },
  { key: STATUS_ENUM.Dead, value: 'Dead' },
  { key: STATUS_ENUM.unknown, value: 'Unknown' }
  ];
  incomingData = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<FilterDialogComponent>);

  form = new FormGroup({
    name: new FormControl<string>('',
      [
        Validators.required, Validators.minLength(3)
      ]),
    status: new FormControl<string | null>(''),
    liveSearch: new FormControl<string>('')
  })

  filterFormSignal = toSignal(this.form.valueChanges, { initialValue: this.form.getRawValue() });

  filterForm$ = signal(this.form);

  charactersService = inject(CharactersService);

  selectionService = inject(SelectionService);

  constructor() {
    effect(() => {
      // console.log('incomingData:', this.incomingData);
      // console.log('statusOptions:', this.statusOptions);
      // console.log(this.filterFormSignal())
      // console.log(this.filterForm$())
    });

  }
  ngAfterViewInit(): void {

    this.form.valueChanges.subscribe(val => {
      console.log('val', val)
    });


    this.form.get('liveSearch')?.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged((prev, curr) => prev === curr),
      switchMap((val: string | null) => {
        console.log('val', val);
        const name = val || '';
        this.selectionService.setFilter({ name: name, status: '' })
        return this.selectionService.filter$;
      })
    ).subscribe((res) => {
      console.log('res', res)
      console.log('this.filterFormSignal()', this.filterFormSignal())
    });

  }

  readonly liveSearchValue = toSignal(this.form.controls.liveSearch.valueChanges,
    { initialValue: this.form.controls.liveSearch.value });


  nameError = computed(() => {
    // Trigger reactivity by calling signal
    this.filterFormSignal();
    const ctrl = this.form.get('name');
    if (ctrl?.touched || ctrl?.dirty) {
      if (ctrl.hasError('required')) return 'Name is required';
      if (ctrl.hasError('minlength')) return 'Name min length is 3';
    }
    return '';
  });

  close() {
    this.dialogRef.close({ action: 'close', query: this.filterFormSignal() });
    // this.dialogRef.afterClosed().subscribe(val=>{
    //   if (val) {
    //     this.characterService.setFilters(val); // inject and call
    //   }
    // })
  }

  onSubmit(form: FormGroup) {
    console.log(form.value);
  }

}
