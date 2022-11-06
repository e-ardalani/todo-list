import {Component, OnInit} from '@angular/core';
import {TaskService} from '../../services/task.service';
import {Task} from '../../models/task-model';

@Component({
  selector: 'app-filter-box',
  templateUrl: './filter-box.component.html',
  styleUrls: ['./filter-box.component.scss']
})
export class FilterBoxComponent implements OnInit {
  totalCount: number;
  bookmarkCount: number;
  doneCount: number;
  ongoingCount: number;
  tasks: Task[];

  constructor(private  taskService: TaskService) {
  }

  ngOnInit(): void {
    this.taskService.getLiveTasks().subscribe(value => {
      this.tasks = value;
      this.totalCount = value.length;
      this.bookmarkCount = value.filter(task => task.isBookmark).length;
      this.doneCount = value.filter(task => task.isDone).length;
      this.ongoingCount = this.totalCount - this.doneCount;
    });
  }


  getAllTask() {
    this.taskService.setTaskFiltered(this.tasks);
  }

  getBookmarkTask() {
    const tasks = this.tasks.filter(task => task.isBookmark === true);
    this.taskService.setTaskFiltered(tasks);
  }

  getCompletedTask() {
    const tasks = this.tasks.filter(task => task.isDone === true);
    this.taskService.setTaskFiltered(tasks);
  }

  getUnCompletedTask() {
    const tasks = this.tasks.filter(task => task.isDone === false);
    this.taskService.setTaskFiltered(tasks);
  }

}
