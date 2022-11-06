import {NgModule} from '@angular/core';
import {ToDoListComponent} from './components/to-do-list/to-do-list.component';
import {ToDoItemComponent} from './components/to-do-item/to-do-item.component';
import {CreateItemComponent} from './components/create-item/create-item.component';
import {SharedModule} from '../../shared/shared.module';
import {FilterBoxComponent} from './components/filter-box/filter-box.component';
import { CreateItemBottomSheetComponent } from './components/create-item-bottom-sheet/create-item-bottom-sheet.component';


@NgModule({
  declarations: [
    ToDoListComponent,
    ToDoItemComponent,
    CreateItemComponent,
    FilterBoxComponent,
    CreateItemBottomSheetComponent,
  ],
  imports: [
    SharedModule
  ],
  exports: [ToDoListComponent, FilterBoxComponent],
  entryComponents: [CreateItemComponent]
})
export class ToDoListModule {
}
