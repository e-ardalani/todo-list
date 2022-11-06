import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './components/header/header.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {LayoutRoutingModule} from './layout-routing.module';
import {SharedModule} from '../shared/shared.module';
import { ProfileComponent } from './components/profile/profile.component';
import {CreateItemComponent} from '../pages/todo-list/components/create-item/create-item.component';
import {ToDoListModule} from '../pages/todo-list/to-do-list.module';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { UserInfoDialogComponent } from './components/user-info-dialog/user-info-dialog.component';


@NgModule({
  declarations: [
    HeaderComponent,
    DashboardComponent,
    ProfileComponent,
    UserInfoDialogComponent,
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    ToDoListModule,
    SharedModule,
    MatDialogModule
  ],
  entryComponents: [CreateItemComponent]

})
export class LayoutModule {
}
