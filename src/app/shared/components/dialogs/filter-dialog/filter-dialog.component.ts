import { Component, AfterViewInit, inject, computed, effect } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { ReactiveFormsModule, FormGroup, FormControl } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogActions, MatDialogClose, MatDialogContent, MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { STATUS_OPTIONS, DIALOG_TYPE_ENUM } from "../../../models/status.enum";
import { SelectionService } from "../../../providers/selection.service";
import { SelectComponent } from "../../form-controls/select/select.component";
import { NameSearchComponent } from "../../form-controls/name-search/name-search.component";

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
    MatFormFieldModule
  ],

  templateUrl: './filter-dialog.component.html',
  styleUrl: './filter-dialog.component.scss',

})
export class FilterDialogComponent implements AfterViewInit {
  statusOptions = STATUS_OPTIONS
  incomingData = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<FilterDialogComponent>);
  selectionService = inject(SelectionService);

  form = new FormGroup({
    name: new FormControl<string>(''),
    status: new FormControl<string | null>(''),
  });

  filterFormSignal = toSignal(this.form.valueChanges, { initialValue: this.form.getRawValue() });

  isFilterBtnDisabled = computed(() => !this.selectionService.getFilterDialogSubmitBtnState());


  constructor() {
    this.setSubmitBtnState();
  }
  ngAfterViewInit(): void {

  }

  setSubmitBtnState() {
    effect(() => {
      const formValues = this.filterFormSignal();
      this.selectionService.filterDialogSubmitBtnState(formValues);
    });
  }

  cancel(){
    this.form.reset();
  }

  filter() {
    // console.log(this.form)
    this.dialogRef.close({ action: DIALOG_TYPE_ENUM.filter, query: this.filterFormSignal() });
    const formValues = this.filterFormSignal();
    this.selectionService.setClearFilterBtnState(formValues,DIALOG_TYPE_ENUM.filter);
    // this.selectionService.setClearFilterBtnState(formValues,{dialogType:'filter'});
  }

  onSubmit(form: FormGroup) {
    // console.log(form.value);
    this.filter();
  }

  

}
