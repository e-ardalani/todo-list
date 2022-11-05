import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';


import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import {AngularFireStorageModule} from '@angular/fire/compat/storage';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';
import {AngularFireDatabaseModule} from '@angular/fire/compat/database';
import {environment} from '../environments/environment';
import {MAT_DIALOG_DATA, MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LayoutModule} from './layout/layout.module';
import {SharedModule} from './shared/shared.module';
import {ToastrModule} from 'ngx-toastr';
import {ToDoListModule} from './pages/todo-list/to-do-list.module';


@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    CommonModule,
    ReactiveFormsModule,
    LayoutModule,
    ToDoListModule,
    SharedModule,
    ToastrModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),


  ],
  providers: [
    {provide: MAT_DIALOG_DATA, useValue: []},
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}}

  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
