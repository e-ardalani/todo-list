import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Task} from '../../models/task-model';
import {TaskService} from '../../services/task.service';


@Component({
  selector: 'app-to-do-item',
  templateUrl: './to-do-item.component.html',
  styleUrls: ['./to-do-item.component.scss']
})
export class ToDoItemComponent {
  @Input() task: Task;
  @Output() done = new EventEmitter();
  @Output() bookMark = new EventEmitter();
  @Output() remove = new EventEmitter();


  constructor(private taskService: TaskService) {
  }

  onDone() {
    this.done.emit();
  }

  onRemove() {
    this.remove.emit();
  }

  onBookMark() {
    this.bookMark.emit();
  }

  getTask(task: Task) {
    this.taskService.setTask(task);
  }

}
