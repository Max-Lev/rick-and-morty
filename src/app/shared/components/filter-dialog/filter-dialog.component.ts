import { AfterViewInit, Component, computed, effect, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { STATUS_ENUM, STATUS_OPTIONS } from '../../models/status.enum';
import { toSignal } from '@angular/core/rxjs-interop';
import { CharactersService } from '../../../core/providers/characters.service';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';
import { SelectionService } from '../../providers/selection.service';
import { SelectComponent } from '../select/select.component';
import { NameSearchComponent } from '../name-search/name-search.component';
@Component({
  selector: 'app-filter-dialog',
  imports: [
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatButtonModule,
    ReactiveFormsModule,
    SelectComponent,
    NameSearchComponent
  ],

  templateUrl: './filter-dialog.component.html',
  styleUrl: './filter-dialog.component.scss',

})
export class FilterDialogComponent implements AfterViewInit {
  statusOptions = STATUS_OPTIONS
  incomingData = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<FilterDialogComponent>);

  form = new FormGroup({
    name: new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
    status: new FormControl<string | null>(''),
    liveSearch: new FormControl<string>('')
  });

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


    // this.form.get('liveSearch')?.valueChanges.pipe(
    //   debounceTime(1000),
    //   distinctUntilChanged((prev, curr) => prev === curr),
    //   switchMap((val: string | null) => {
    //     console.log('val', val);
    //     const name = val || '';
    //     this.selectionService.setFilter({ name: name, status: '' })
    //     return this.selectionService.filter$;
    //   })
    // ).subscribe((res) => {
    //   console.log('res', res)
    //   console.log('this.filterFormSignal()', this.filterFormSignal())
    // });

    // this.dialogRef.afterClosed().subscribe((value:{action:string})=>{
    //   debugger;
    //   // query: this.filterFormSignal()
    //   if (value.action === 'search') {
    //     // this.characterService.setFilters(val); // inject and call
    //   }
    // })

  }

  readonly liveSearchValue = toSignal(this.form.controls.liveSearch.valueChanges,
    { initialValue: this.form.controls.liveSearch.value });


  nameError = computed(() => {
    // Trigger reactivity by calling signal
    // this.filterFormSignal();
    const ctrl = this.form.get('name');
    if (ctrl?.touched || ctrl?.dirty) {
      if (ctrl.hasError('required')) return 'Name is required';
      if (ctrl.hasError('minlength')) return 'Name min length is 3';
    }
    return '';
  });

  search() {
    this.dialogRef.close({ action: 'search', query: this.filterFormSignal() });
  }

  onSubmit(form: FormGroup) {
    console.log(form.value);
  }

}
