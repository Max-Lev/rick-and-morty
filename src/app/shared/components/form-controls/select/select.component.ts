import { Component, forwardRef, Input, input } from '@angular/core';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { STATUS_ENUM } from '../../../models/status.enum';

@Component({
  selector: 'app-select',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,

  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
    {
      provide: MatFormFieldControl,
      useExisting: forwardRef(() => SelectComponent),
    },
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent implements ControlValueAccessor {

  @Input() control!: FormControl;

  private _value: any;

  // On change handler
  onChange = (value: any) => {console.log('onChange called',this._value,value) };

  // On touched handler
  onTouched = (value:any) => {console.log('onTouched called',this._value) };

  onSelect(value: any): void {
    this._value = value;
    this.onChange(value); // Notifies Angular form that value changed
    this.onTouched(value);     // Notifies Angular form control was touched
  }

  // Write value from form control to the select component
  writeValue(value: any): void {
    this._value = value;
  }

  // Register on change callback
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // Register on touched callback
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // Set disabled state
  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      // handle disable logic (disable the control if needed)
    }
  }

  // Method to handle value change from select
  // _onChange(value: any): void {
  //   this._value = value;
  //   this.onChange(value); // Notify the form control of the change
  // }

  statusOptions = input.required<{ key: STATUS_ENUM; value: string; }[]>();

}
