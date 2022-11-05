import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from './modules/material.module';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { LoadingComponent } from './components/loading/loading.component';
import {CustomTextAreaComponent} from './components/custom-text-area/custom-text-area.component';


const modules = [
  FormsModule,
  ReactiveFormsModule,
  MaterialModule,

];


@NgModule({
  declarations: [
    LoadingComponent,
    CustomInputComponent,
    CustomTextAreaComponent,
  ],
  imports: [
    CommonModule,
    ...modules,
  ],

  exports: [
    ...modules,
    CustomInputComponent,
    CustomTextAreaComponent,
    LoadingComponent,
  ]
})
export class SharedModule {
}
