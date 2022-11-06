import {Component, OnInit} from '@angular/core';
import {TaskService} from '../../services/task.service';

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
