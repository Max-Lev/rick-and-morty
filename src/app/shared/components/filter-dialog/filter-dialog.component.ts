import { Component, computed, effect, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { STATUS_ENUM } from '../../models/status.enum';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatSelectModule } from '@angular/material/select';
import { CharactersService } from '../../../core/providers/characters.service';
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
    MatSelectModule
  ],
  templateUrl: './filter-dialog.component.html',
  styleUrl: './filter-dialog.component.scss'
})
export class FilterDialogComponent {
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
  })

  filterFormSignal = toSignal(this.form.valueChanges, { initialValue: this.form.getRawValue() })

  charactersService = inject(CharactersService);

  constructor() {
    effect(() => {
      console.log('incomingData:', this.incomingData);
      console.log('statusOptions:', this.statusOptions);
    });
    effect(() => {

    });

    // this.form.valueChanges.subscribe((value) => {
    //   // console.log(value);  
    // })

  }

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
