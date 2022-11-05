import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {TaskService} from '../../services/task.service';
import {combineLatest, Observable, of} from 'rxjs';
import {Task} from '../../models/task-model';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {CreateItemComponent} from '../create-item/create-item.component';
import {MatDialog} from '@angular/material/dialog';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {AuthService} from '../../../auth/services/auth.service';


@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss']
})
export class ToDoListComponent implements OnInit {
  tasks: Task[];

  constructor(private db: AngularFirestore, private taskService: TaskService,
              public authService: AuthService,
              public afAuth: AngularFireAuth,
              public dialog: MatDialog) {
    this.tasks = [];
  }

  sortByDateDesc(l: Task, r: Task) {
    return r.creationDate - l.creationDate;
  }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    const tasksObservable = this.taskService.getLiveTasks();
    const searchObservable = this.taskService.searchItem;
    combineLatest([tasksObservable, searchObservable])
      .subscribe(([tasks, searchTerm]) => {
        this.tasks = tasks.filter(task => {
          if (searchTerm) {
            return task.title.indexOf(searchTerm) >= 0;
          }
          return 1;
        });
        // }).sort((l, r) => this.sortByDateDesc(l, r));
      });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
    this.taskService.updateAll(this.tasks).finally();
  }


  openDialogCreateTask() {
    const dialog = this.dialog.open(CreateItemComponent, {
      disableClose: false,
      width: '400px',
      height: 'auto'
    });
    dialog.afterClosed().subscribe((task) => {
    });
  }

  onDone(task) {
    this.taskService.doneTask(task.id, !task.isDone).finally();
  }

  onBookMark(task) {
    this.taskService.bookMarkTask(task.id, !task.isBookmark).finally();
  }

  onRemove(task) {
    this.taskService.removeTask(task.id).finally();
  }

}
