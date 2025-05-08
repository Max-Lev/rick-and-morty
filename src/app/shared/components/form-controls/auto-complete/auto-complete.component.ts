import { Component, DestroyRef, forwardRef, inject, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { Observable, startWith, map, of } from 'rxjs';
import { SPICIES_OPTIONS } from '../../../models/status.enum';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

// export interface StateGroup {
//   letter: string;
//   names: string[];
// }

// export const _filter = (opt: string[], value: string): string[] => {
//   const filterValue = value.toLowerCase();
//   return opt.filter(item => item.toLowerCase().includes(filterValue));
// };

@Component({
  selector: 'app-auto-complete',
  imports: [
    AsyncPipe,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutoCompleteComponent),
      multi: true,
    },
    {
      provide: MatFormFieldControl,
      useExisting: forwardRef(() => AutoCompleteComponent),
    },
  ],
  templateUrl: './auto-complete.component.html',
  styleUrl: './auto-complete.component.scss'
})
export class AutoCompleteComponent implements ControlValueAccessor, OnChanges, OnInit {

  destroy$ = inject(DestroyRef)

  onChange = (value: any) => { console.log('onChange called') };
  // On touched handler
  onTouched = (value: any) => { console.log('onTouched called') };

  writeValue(value: any): void {
    this.inputControl.setValue(value, { emitEvent: false });
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
    this.inputControl.valueChanges.subscribe(val => fn(val));
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;

  }
  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.inputControl.disable();
    } else {
      this.inputControl.enable();
    }
  }

  @Input() options!: { key: string; value: string; }[];// = SPICIES_OPTIONS
  @Input() placeholder!: string;
  @Input() title!: string;
  filteredOptions!: Observable<{ key: string; value: string; }[]>;// = of(SPICIES_OPTIONS);

  inputControl = inject(FormBuilder).control('');

  ngOnInit() {
    this.filteredOptions = this.inputControl!.valueChanges.pipe(takeUntilDestroyed(this.destroy$))
      .pipe(
        startWith(''),
        map(value => this._filter(value || '')),
      );
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes)
  }


  private _filter(value: string): { key: string; value: string; }[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.value.toLowerCase().includes(filterValue));
  }

  onSelected(event: MatAutocompleteSelectedEvent) {
    this.onChange(event.option.value);
    this.onTouched(event.option.value);
  }

}
