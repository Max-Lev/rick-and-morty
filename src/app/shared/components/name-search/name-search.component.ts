import { AfterViewInit, ChangeDetectorRef, Component, computed, forwardRef, inject, Injector, Input, OnChanges, runInInjectionContext, Signal, signal, SimpleChanges } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-name-search',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    // MatFormFieldControl
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NameSearchComponent),
      multi: true,
    },
    {
      provide: MatFormFieldControl,
      useExisting: forwardRef(() => NameSearchComponent),
    },
  ],
  templateUrl: './name-search.component.html',
  styleUrl: './name-search.component.scss'
})
export class NameSearchComponent implements ControlValueAccessor, OnChanges, AfterViewInit {

  @Input({ required: false }) form!: FormGroup;

  // filterFormSignal = toSignal(this.form?.valueChanges, { initialValue: this.form?.getRawValue() });
  // filterFormSignal = signal<{ name: string | null; status: string | null }>({ name: null, status: null });
  filterFormSignal!: Signal<{ name: string | null; status: string | null }>;

  injector = inject(Injector);

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


  // ControlValueAccessor
  writeValue(value: any): void {
    this.value = value ?? '';
    console.log(this.value)
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // Component
  value: string | null = '';
  disabled: boolean = false;
  onChange = (_: any) => { };
  onTouched = () => { };

  constructor() { }
  ngAfterViewInit(): void {
    // this.filterFormSignal = toSignal(this.form?.valueChanges, { initialValue: this.form?.getRawValue() });
  }
  ngOnChanges(changes: SimpleChanges): void {
    // if (changes['form'] && this.form) {
    //   const observable = this.form.valueChanges;
    //   if (observable) {
    //     // Convert the observable to a signal
    //     const reactiveFormSignal = toSignal(observable, {initialValue: this.form.getRawValue()});
    //     this.filterFormSignal = reactiveFormSignal;
    //   }
    // }
    if (changes['form'] && this.form) {
      
      runInInjectionContext(this.injector, () => {
        this.filterFormSignal = toSignal(this.form.valueChanges, {
          initialValue: this.form.getRawValue(),
        });
      });
    }

  }

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
    this.onTouched();
  }
}
