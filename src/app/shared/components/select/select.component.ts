import { Component, forwardRef, Input, input } from '@angular/core';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { STATUS_ENUM } from '../../models/status.enum';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

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
  _onChange(value: any): void {
    this._value = value;
    this.onChange(value); // Notify the form control of the change
  }

  statusOptions = input.required<{ key: STATUS_ENUM; value: string; }[]>();

}
/**
 * import { Component, DestroyRef, inject, Input } from '@angular/core';
import { ControlValueAccessor, FormControl } from '@angular/forms';
import { DROPDOWN_CONTROL_IMPORTS, DROPDOWN_CONTROL_PROVIDERS } from './config';
import { IOptions } from '../../../core/models/breeds.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-drop-down',
  standalone: true,
  imports: [...DROPDOWN_CONTROL_IMPORTS],
  providers: [...DROPDOWN_CONTROL_PROVIDERS],
  templateUrl: './drop-down-control.component.html'
})
export class DropDownControlComponent implements ControlValueAccessor {

  dropDownControl = new FormControl('');

  onChange: any = () => { };

  onTouched: any = () => { };

  @Input() options: IOptions[] = [];

  @Input({ required: true }) cntrlTitle!: string;

  private destroyRef = inject(DestroyRef);

  writeValue = (value: any): void => this.dropDownControl.setValue(value);

  registerOnChange(fn: any): void {
    this.dropDownControl.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(value => {
      this.onChange(value);
      fn(value);
    });
  }

  registerOnTouched = (fn: any): void => this.onTouched = fn;

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.dropDownControl.disable() : this.dropDownControl.enable();
  }

}

 */