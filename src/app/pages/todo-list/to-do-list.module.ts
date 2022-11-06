import {NgModule} from '@angular/core';
import {ToDoListComponent} from './components/to-do-list/to-do-list.component';
import {ToDoItemComponent} from './components/to-do-item/to-do-item.component';
import {CreateItemComponent} from './components/create-item/create-item.component';
import {SharedModule} from '../../shared/shared.module';
import {UpdateTaskComponent} from './components/update-task/update-task.component';
import {FilterBoxComponent} from './components/filter-box/filter-box.component';


@NgModule({
  declarations: [
    ToDoListComponent,
    ToDoItemComponent,
    CreateItemComponent,
    UpdateTaskComponent,
    FilterBoxComponent,
  ],
  imports: [
    SharedModule
  ],
  exports: [ToDoListComponent, UpdateTaskComponent, FilterBoxComponent],
  entryComponents: [CreateItemComponent]
})
export class ToDoListModule {
}
