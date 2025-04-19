import { Component, computed, effect, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { STATUS_ENUM } from '../../models/status.enum';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { JsonPipe, NgIf } from '@angular/common';
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
  statusOptions = [{key: STATUS_ENUM.Alive, value: 'Alive'},
    {key: STATUS_ENUM.Dead, value: 'Dead'},
    {key: STATUS_ENUM.unknown, value: 'Unknown'}
  ];
  incomingData = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<FilterDialogComponent>);

  form = new FormGroup({
    name: new FormControl<string>('', [
      Validators.required, Validators.minLength(3)
    ]),
    status: new FormControl<STATUS_ENUM | null>(null),
  })

  filterFormSignal = toSignal(this.form.valueChanges, { initialValue: this.form.getRawValue() })

  charactersService = inject(CharactersService);

  constructor() {
    effect(() => {
      console.log('incomingData:', this.incomingData);
      console.log('statusOptions:', this.statusOptions);
    });
    effect(() => {
      // console.log(this.filterFormSignal())
      // const { name, status } = this.filterFormSignal();
      // const value = {
      //   name: name, status: status
      // }
      // if(value===null){
      //   return;
      // }else{
      //   this.charactersService.findByNameStatus(value as any).subscribe(v=>console.log(v))
      // }
    });

    this.form.valueChanges.subscribe((value) => {
      // console.log(value);  
    })

  }

  nameError = computed(() => {
    // Trigger reactivity by calling signal
    this.filterFormSignal();
    const ctrl = this.form.get('name');
    if (ctrl?.touched || ctrl?.dirty) {
      if (ctrl.hasError('required')) return 'Name is required';
      if (ctrl.hasError('minlength')) return 'Name is too short';
    }
    return '';
  });

  close() {
    this.dialogRef.close({ action: 'close', query: this.filterFormSignal() });
  }

  onSubmit(form: FormGroup) {
    console.log(form.value);
  }

}
/**
 * private fb = inject(FormBuilder);
  

  constructor(){
    effect(()=>{
console.log('firstName: ',this.firstName())
    })
        effect(() => {
      console.log(this.data);
    });
    effect(() => {
      const name = this.nameError()
      console.log('name: ',name);
      console.log('formEffect: ',this.formEffect);
      // console.log('filterFormSignal: ',this.filterFormSignal());
    });


    this.form.valueChanges.subscribe((value) => {
      // console.log(value);  
    })
  }

  // ✅ Standard Reactive Form setup
  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]]
  });
  firstName = toSignal(this.form.controls.name.valueChanges);


  // ✅ Wrap form values into a signal (re-evaluates on form change)
  formSignal = signal(this.form.getRawValue());

  // ✅ Keep formSignal in sync with form values
  formEffect = effect(() => {
    this.formSignal.set(this.form.getRawValue());
  });

  // ✅ Computed error getters for name/email
  nameError = computed(() => {
    const control = this.form.get('name');
    if (control?.touched || control?.dirty) {
      if (control.hasError('required')) return 'Name is required';
      if (control.hasError('minlength')) return 'Min 3 characters required';
    }
    return '';
  });

  emailError = computed(() => {
    const control = this.form.get('email');
    if (control?.touched || control?.dirty) {
      if (control.hasError('required')) return 'Email is required';
      if (control.hasError('email')) return 'Email is invalid';
    }
    return '';
  });

  onSubmit() {
    if (this.form.valid) {
      alert(`Submitted: ${JSON.stringify(this.form.value)}`);
    }
  }
 */