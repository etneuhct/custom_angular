import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {XFormComponent} from './_shared/x-form/x-form/x-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatTooltipModule} from '@angular/material/tooltip';
import {TextFieldModule} from '@angular/cdk/text-field';
import {FormErrorComponent} from './_shared/x-form/form-error/form-error.component';
import {MatButtonModule} from '@angular/material/button';
import {MaterialFileInputModule} from 'ngx-material-file-input';
import {HttpClient, HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    XFormComponent,
    FormErrorComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatButtonToggleModule,
    MatIconModule,
    MatTooltipModule,
    TextFieldModule,
    MatButtonModule,
    MaterialFileInputModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
