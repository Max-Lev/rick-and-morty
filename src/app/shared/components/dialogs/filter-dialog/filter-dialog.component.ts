import { Component, AfterViewInit, inject, computed, effect } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { ReactiveFormsModule, FormGroup, FormControl } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogActions, MatDialogClose, MatDialogContent, MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { STATUS_OPTIONS, DIALOG_TYPE_ENUM, CHARACTER_TYPES, GENDER_OPTIONS, SPICIES_OPTIONS } from "../../../models/status.enum";
import { SelectionService } from "../../../providers/selection.service";
import { SelectComponent } from "../../form-controls/select/select.component";
import { NameSearchComponent } from "../../form-controls/name-search/name-search.component";
import { AutoCompleteComponent } from "../../form-controls/auto-complete/auto-complete.component";

@Component({
  selector: 'app-filter-dialog',
  imports: [
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatButtonModule,
    ReactiveFormsModule,
    SelectComponent,
    NameSearchComponent,
    MatFormFieldModule,
    AutoCompleteComponent,
  ],

  templateUrl: './filter-dialog.component.html',
  styleUrl: './filter-dialog.component.scss',

})
export class FilterDialogComponent implements AfterViewInit {
  statusOptions = STATUS_OPTIONS;
  speciesOptions = SPICIES_OPTIONS;
  genderOptions = GENDER_OPTIONS;
  typeOptions = CHARACTER_TYPES;

  incomingData = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<FilterDialogComponent>);
  selectionService = inject(SelectionService);

  form = new FormGroup({
    name: new FormControl<string>(''),
    status: new FormControl<string | null>(''),
    species: new FormControl<string | null>(null),
    gender: new FormControl<string | null>(null),
    type: new FormControl<string | null>(null)
  });

  filterFormSignal = toSignal(this.form.valueChanges, { initialValue: this.form.getRawValue() });

  isFilterBtnDisabled = computed(() => !this.selectionService.getFilterDialogSubmitBtnState());


  constructor() {
    this.setSubmitBtnState();
    // effect(()=>{
    //   console.log(this.filterFormSignal());
    //   console.log(this.isFilterBtnDisabled());
    // })
  }
  ngAfterViewInit(): void {

  }

  setSubmitBtnState() {
    effect(() => {
      const formValues = this.filterFormSignal();
      this.selectionService.filterDialogSubmitBtnState(formValues);
    });
  }

  cancel() {
    this.form.reset();
  }

  filter() {
    this.dialogRef.close({ action: DIALOG_TYPE_ENUM.filter, query: this.filterFormSignal() });
    const formValues = this.filterFormSignal();
    console.log(formValues)
    this.selectionService.setClearFilterBtnState(formValues, DIALOG_TYPE_ENUM.filter);
  }

  onSubmit(form: FormGroup) {
    this.filter();
  }



}
