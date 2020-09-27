import {Component, OnInit} from '@angular/core';
import {Validators} from '@angular/forms';
import {feedFormFromData, XFormComponent, XFormField, XFormFieldType} from './_shared/x-form/x-form/x-form.component';
import {BookService} from './_services/book.service';
import {map} from 'rxjs/operators';
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ng-x-form';
  form = getBookForm();
  books: Observable<undefined | { data: unknown; form: XFormField[] }[]>;

  constructor(private bookService: BookService) {

  }
  ngOnInit(): void {
    this.books = this.bookService.objectBehaviorSubject
      .pipe(map(
        x => {
          if (!x) { return; }
          return Array.from(x, y => ({data: y, form: feedFormFromData(getBookForm(), y)}));
        }));
  }

  update(data, xFormUpdate: XFormComponent): void {
    this.bookService.patchObject(data[this.bookService.keyId], xFormUpdate.getFormValues());
  }

  create(xFormCreate: XFormComponent): void {
    this.bookService.createObject(xFormCreate.getFormValues());
  }

  delete(data: unknown): void {
    this.bookService.deleteObject(data[this.bookService.keyId]);
  }
}

function fieldOnChange(form: XFormComponent): void{

}

export function getBookForm(): XFormField[] {
  return [
    {
      type: XFormFieldType.simpleInput, label: 'Nom du livre',
      name: 'name', formFieldAppearance: 'outline',
      initialValue: '', maxLength: 200, onChange: fieldOnChange,
      validators: [Validators.required, Validators.maxLength(200)]
    },
    {
      type: XFormFieldType.textArea, label: 'Description',
      name: 'description', formFieldAppearance: 'outline',
      initialValue: '', maxLength: 200, onChange: fieldOnChange,
      validators: [Validators.maxLength(200)]
    },
    {
      type: XFormFieldType.checkbox, label: 'Possédé',
      name: 'possessed', formFieldAppearance: 'outline',
      initialValue: false, maxLength: 200, onChange: fieldOnChange,
      validators: null
    },
    {
      type: XFormFieldType.selectField, label: 'Genre du livre',
      name: 'gender', formFieldAppearance: 'outline', values: [{value: 0, valueName: 'Gender1'}, {value: 1, valueName: 'Gender2'}],
      initialValue: '1', maxLength: 200, onChange: fieldOnChange,
      validators: [Validators.maxLength(200)]
    }
  ];
}
