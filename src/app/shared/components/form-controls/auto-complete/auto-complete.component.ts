import { Component, forwardRef, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { Observable, startWith, map, of } from 'rxjs';
import { SPICIES_OPTIONS } from '../../../models/status.enum';

export interface StateGroup {
  letter: string;
  names: string[];
}

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();
  return opt.filter(item => item.toLowerCase().includes(filterValue));
};

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
export class AutoCompleteComponent implements ControlValueAccessor,OnChanges,OnInit {

  onChange = (value: any) => {console.log('onChange called') };
  // On touched handler
  onTouched = (value:any) => {console.log('onTouched called') };
  
  writeValue(obj: any): void {
   console.log('auto-complete')
  }
  registerOnChange(fn: any): void {
   console.log('auto-complete');
   this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
   console.log('auto-complete');
   this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
   console.log('auto-complete')
  }

  // @Input() options:any[]  = [];

  ngOnChanges(changes: SimpleChanges): void {
   console.log(changes)
  }

  // stateGroupOptions: Observable<StateGroup[]> = of(SPICIES_OPTIONS);
  options: {key: string;value: string;}[] = SPICIES_OPTIONS
  filteredOptions: Observable<{key: string;value: string;}[]> = of(SPICIES_OPTIONS);
  // filteredOptions!: Observable<string[]>;
  private _formBuilder = inject(FormBuilder);

  stateForm = this._formBuilder.group({
    stateGroup: '',
  });

  ngOnInit() {
    this.filteredOptions = this.stateForm.get('stateGroup')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value:string): {key: string;value: string;}[]{
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.value.toLowerCase().includes(filterValue));
  }

  // ngOnInit() {
  //   this.stateGroupOptions = this.stateForm.get('stateGroup')!.valueChanges.pipe(
  //     startWith(''),
  //     map(value => this._filterGroup(value || '')),
  //   );
  // }

  // private _filterGroup(value: string): StateGroup[] {
  //   if (value) {
  //     return this.options
  //       .map(group => ({letter: group.letter, names: _filter(group.names, value)}))
  //       .filter(group => group.names.length > 0);
  //   }

  //   return this.options;
  // }

  onSelected(event:MatAutocompleteSelectedEvent){
    console.log(event.option.value);
    this.onChange(event.option.value);
    this.onTouched(event.option.value);
  }

}
