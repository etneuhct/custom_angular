import {Component, Input, OnInit} from '@angular/core';
import {XFormField} from '../x-form/x-form.component';

@Component({
  selector: 'app-form-error',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.css']
})
export class FormErrorComponent implements OnInit {
  @Input() form: any;
  @Input() formField: XFormField;
  constructor() { }

  ngOnInit(): void {
  }

}

export interface IFormError {
  error: string;
  message: string;
}
