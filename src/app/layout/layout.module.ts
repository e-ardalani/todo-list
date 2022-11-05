import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './components/header/header.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {LayoutRoutingModule} from './layout-routing.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
// import {CreateItemComponent} from '../to-do-list/components/create-item/create-item.component';
// import {ToDoListModule} from '../to-do-list/to-do-list.module';
import {SharedModule} from '../shared/shared.module';
// import { ProfileComponent } from './components/profile/profile.component';
import { SettingComponent } from './components/setting/setting.component';


@NgModule({
  declarations: [
    HeaderComponent,
    DashboardComponent,
    SidebarComponent,
    // ProfileComponent,
    SettingComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    // ToDoListModule,
    SharedModule
  ],
  // entryComponents: [CreateItemComponent]

})
export class LayoutModule {
}
