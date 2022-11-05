import {NgModule} from '@angular/core';
import {ToDoListComponent} from './components/to-do-list/to-do-list.component';
import {ToDoItemComponent} from './components/to-do-item/to-do-item.component';
import {CreateItemComponent} from './components/create-item/create-item.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [
    ToDoListComponent,
    ToDoItemComponent,
    CreateItemComponent],
  imports: [
    SharedModule

  ],
  exports: [ToDoListComponent],
  entryComponents: [CreateItemComponent]
})
export class ToDoListModule {
}
