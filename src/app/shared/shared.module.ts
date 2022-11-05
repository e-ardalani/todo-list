import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from './modules/material.module';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { LoadingComponent } from './components/loading/loading.component';
import {CustomTextAreaComponent} from './components/custom-text-area/custom-text-area.component';
import { ToggleThemeComponent } from './components/toggle-theme/toggle-theme.component';


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
    ToggleThemeComponent,
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
    ToggleThemeComponent,
  ]
})
export class SharedModule {
}
