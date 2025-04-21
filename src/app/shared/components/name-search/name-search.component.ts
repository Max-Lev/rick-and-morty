import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-name-search',
  imports: [
    MatFormFieldModule,
    MatInputModule,
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
export class NameSearchComponent implements ControlValueAccessor {

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

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
    this.onTouched();
  }
}
