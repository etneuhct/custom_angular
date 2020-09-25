import { Component } from '@angular/core';
import {Validators} from '@angular/forms';
import {XFormComponent, XFormField, XFormFieldType} from './_shared/x-form/x-form/x-form.component';
import {FileValidator} from 'ngx-material-file-input';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-x-form';
  form = getPersonalProfileForm();

  submit(xForm: XFormComponent): void {
    console.log(xForm.isValid());
    console.log(xForm.getFormValues());
  }

  checkOnChange(xForm): void {
    console.log(xForm.getFormValues());
  }
}

function fieldOnChange(form): void{

}

export function getPersonalProfileForm(): XFormField[] {
  return [
    {
      type: XFormFieldType.simpleInput, label: 'Votre prénom', name: 'first_name', formFieldAppearance: 'outline',
      initialValue: '', maxLength: 200, style: {width: '100px'}, onChange: fieldOnChange,
      validators: [Validators.required, Validators.maxLength(20)]
    },
    {
      type: XFormFieldType.simpleInput, label: 'Votre nom de famille', name: 'last_name',
      initialValue: '', maxLength: 200,
      validators: [Validators.required, Validators.maxLength(20)]
    },
    {
      type: XFormFieldType.textArea, label: 'Description', name: 'description',
      initialValue: '', maxLength: 2000,
      validators: [Validators.required, Validators.maxLength(2000)]
    },
    {
      type: XFormFieldType.selectField, label: 'Choisis', name: 'choice',
      initialValue: '', values: [{value: 0, valueName: 'bonjour'}],
      validators: [Validators.required, Validators.maxLength(2000)]
    },
    {
      type: XFormFieldType.fileField, label: 'Upload', name: 'file',
      initialValue: '', maxLength: 200000, extension: '.txt,.csv',
      validators: [Validators.required, Validators.maxLength(2000), FileValidator.maxContentSize(200000)]
    },
    {
      type: XFormFieldType.toggleButton, label: 'Toggle', name: 'toggle',
    initialValue: '1', values: [{value: 0, valueName: 'bonjour'}, {value: 1, valueName: 'vdvd'}],
      validators: [Validators.required]
    },
    {
      type: XFormFieldType.slideToggle, label: 'slide', name: 'slide',
      initialValue: 'true', validators: [Validators.required]
    },
    {
      type: XFormFieldType.checkbox, label: 'check', name: 'check',
      initialValue: 'true',
      validators: [Validators.required]
    }
  ];
}
