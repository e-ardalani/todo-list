import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from './modules/material.module';
import {CustomInputComponent} from './components/custom-input/custom-input.component';
import {LoadingComponent} from './components/loading/loading.component';
import {CustomTextAreaComponent} from './components/custom-text-area/custom-text-area.component';
import {ToggleThemeComponent} from './components/toggle-theme/toggle-theme.component';
import {DialogConfirmComponent} from './components/dialog-confirm/dialog-confirm.component';
import {ConfirmBottomSheetComponent} from './components/confirm-bottom-sheet/confirm-bottom-sheet.component';


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
    DialogConfirmComponent,
    ConfirmBottomSheetComponent,
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
  ],
  entryComponents: [DialogConfirmComponent]
})
export class SharedModule {
}
