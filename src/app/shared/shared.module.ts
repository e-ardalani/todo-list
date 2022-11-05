import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from './modules/material.module';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { LoadingComponent } from './components/loading/loading.component';


const modules = [
  FormsModule,
  ReactiveFormsModule,
  MaterialModule,

];


@NgModule({
  declarations: [
    CustomInputComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    ...modules,
  ],

  exports: [
    ...modules,
    CustomInputComponent,
    LoadingComponent,
  ]
})
export class SharedModule {
}
