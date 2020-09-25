import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-x-form',
  templateUrl: './x-form.component.html',
  styleUrls: ['./x-form.component.css']
})

export class XFormComponent implements OnInit, OnChanges {
  @Input() formFields: XFormField[];
  @Input() validators = null;
  @Input() activateOnChange = null;
  public form: FormGroup;

  formBuilder: FormBuilder;
  formValidators = {};
  xFormFieldType = XFormFieldType;

  constructor(formBuilder: FormBuilder) {
    this.formBuilder = formBuilder;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.formFields = changes.formFields.currentValue;
    this.setFormValidators();
    this.form = this.formBuilder.group(this.formValidators, { validator: this.validators });
  }

  ngOnInit(): void {
    this.setFormValidators();
    this.form = this.formBuilder.group(this.formValidators, { validator: this.validators });
  }

  private setFormValidators(): void {
      this.formValidators = {};
      for (const element of this.formFields) {
        this.formValidators[element.name] = [{value: element.initialValue, disabled: element.readOnly}, element.validators];
      }
  }

  public isValid(): boolean {
    if (this.form) {
      for (const formField of this.formFields) {
        formField.initialValue = this.form.value[formField.name];
      }
      return this.form.status === 'VALID';
    }
    return false;
  }

  public getFormValues(): {} {
    return this.form.value;
  }

  public onChange(onChangeFunction): void {
    if (onChangeFunction) {
      onChangeFunction(this);
    }
  }

}


export interface XFormField {
  id?: string;
  tooltip?: string;
  inputType?: 'number' | 'password' | 'email';
  readOnly?: boolean;
  type: XFormFieldType;
  label: string;
  name: string;
  placeholder?: string;
  initialValue: string|number|boolean;
  ariaLabel?: string;
  maxLength?: number;
  conditionField?: string;
  conditionValue?: string | number;
  disabled?: boolean;
  values?: XFormValue[];
  validators: Validators[];
  extension?: string;
  style?: {};
  onChange?: any;
  formFieldAppearance?: 'outline';
}

export interface XFormValue {
  value: string | number;
  valueName: string;
}

export enum XFormFieldType {
  slideToggle,
  password,
  selectField,
  textArea,
  toggleButton,
  simpleInput,
  fileField,
  checkbox
}

export function feedFormFromData(formFields: XFormField[], data: {}): XFormField[] {
  for (const field of formFields) {
      for (const dataItem of Object.keys(data)) {
        if (field.name === dataItem) {
          if (field.type === XFormFieldType.checkbox) {
            field.initialValue = field.initialValue === 'true' || field.initialValue === true;
          }
          else {
            field.initialValue = data[dataItem].toString();
          }
        }
      }
  }
  return formFields;
}

