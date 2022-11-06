import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {TaskService} from '../../services/task.service';
import {combineLatest, Observable, of, Subscription} from 'rxjs';
import {Task} from '../../models/task-model';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {CreateItemComponent} from '../create-item/create-item.component';
import {MatDialog} from '@angular/material/dialog';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {AuthService} from '../../../auth/services/auth.service';
import {DialogConfirmComponent} from '../../../../shared/components/dialog-confirm/dialog-confirm.component';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {ConfirmBottomSheetComponent} from '../../../../shared/components/confirm-bottom-sheet/confirm-bottom-sheet.component';


@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss']
})
export class ToDoListComponent implements OnInit, OnDestroy {
  tasks: Task[];
  subscriptions: Subscription = new Subscription();
  screenMode;
  public getScreenWidth: any;
  public getScreenHeight: any;


  constructor(private db: AngularFirestore, private taskService: TaskService,
              public authService: AuthService,
              public afAuth: AngularFireAuth,
              public dialog: MatDialog,
              private bottomSheet: MatBottomSheet
  ) {
    this.tasks = [];
  }

  // sortByDateDesc(l: Task, r: Task) {
  //   return r.creationDate - l.creationDate;
  // }

  ngOnInit(): void {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
    this.subscriptions.add(this.taskService.taskFiltered$.asObservable().subscribe(tasks => {
      this.tasks = tasks;
    }));
    this.getTasks();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
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


  openDialogTask(task?: string) {
    const dialog = this.dialog.open(CreateItemComponent, {
        disableClose: false,
        width: '400px',
        height: 'auto',
        data: {task}
      })
    ;
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
    if (this.getScreenWidth > 959) {
      const dialog = this.dialog.open(DialogConfirmComponent, {
        disableClose: true,
      });
      dialog.afterClosed().subscribe((success) => {
        if (success) {
          this.taskService.removeTask(task.id).finally();

        }
      });
    } else {
      const bSheet = this.bottomSheet.open(ConfirmBottomSheetComponent, {
        disableClose: true,
      });
      bSheet.afterDismissed().subscribe((task) => {
      });
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
