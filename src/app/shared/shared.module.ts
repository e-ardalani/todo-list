import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from './modules/material.module';


const modules = [
  FormsModule,
  ReactiveFormsModule,
  MaterialModule,

];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...modules,
  ],

  exports: [
    ...modules,
  ]
})
export class SharedModule {
}
