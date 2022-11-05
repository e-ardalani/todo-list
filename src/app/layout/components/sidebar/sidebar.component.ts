import {Component, OnInit} from '@angular/core';
import {TaskService} from '../../../pages/todo-list/services/task.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  totalCount: number;
  bookmarkCount: number;
  doneCount: number;
  ongoingCount: number;

  constructor(private  taskService: TaskService) {
  }

  ngOnInit(): void {
    this.taskService.getLiveTasks().subscribe(value => {
      this.totalCount = value.length;
      this.bookmarkCount = value.filter(task => task.isBookmark).length;
      this.doneCount = value.filter(task => task.isDone).length;
      this.ongoingCount = this.totalCount - this.doneCount;
    });
  }

}
