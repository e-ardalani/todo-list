import {Injectable} from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Task} from '../models/task-model';
import {map} from 'rxjs/operators';
import {AuthService} from '../../auth/services/auth.service';
import {User} from '../../auth/models/user';
import {ToastrService} from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks: AngularFirestoreCollection<Task>;
  userId = this.authService.getUid();
  searchItem: BehaviorSubject<string> = new BehaviorSubject<string>('');
  taskItem$: Subject<Task> = new Subject<Task>();
  taskFiltered$: Subject<Task[]> = new Subject<Task[]>();


  constructor(public afs: AngularFirestore,
              public afAuth: AngularFireAuth,
              private authService: AuthService,
              private toastr: ToastrService) {

  }


  addTask(task: Task): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.getTasks().subscribe(tasks => {
        tasks.unshift(task);
        const userRef = this.afs.doc(`users/${this.userId}`);
        userRef.set({tasks}, {mergeFields: ['tasks']}).then(() => resolve()).catch(() => reject());
      });
    });
  }

  doneTask(taskId: string, isDone: boolean): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.getTasks().subscribe(tasks => {
        const task = tasks.find(item => item.id === taskId);
        if (task) {
          task.isDone = isDone;
        }
        const userRef = this.afs.doc(`users/${this.userId}`);
        userRef.set({tasks}, {mergeFields: ['tasks']}).then(() => resolve()).catch(() => reject());
      });
    });
  }

  updateTask(taskId: string, title?: string, description?: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.getTasks().subscribe(tasks => {
        const task = tasks.find(item => item.id === taskId);
        if (task && title) {
          task.title = title;
        }

        if (task && description) {
          task.description = description;
        }
        const userRef = this.afs.doc(`users/${this.userId}`);
        userRef.set({tasks}, {mergeFields: ['tasks']}).then(() => resolve()).catch(() => reject());
      });
    });
  }

  getLiveTasks(): Observable<Task[]> {
    return this.afs.doc<User>(`users/${this.userId}`).snapshotChanges().pipe(map(item => item.payload.data().tasks ? item.payload.data().tasks : []));
  }

  updateAll(tasks: Task[]): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const userRef = this.afs.doc(`users/${this.userId}`);
      userRef.set({tasks}, {mergeFields: ['tasks']}).then(() => resolve()).catch(() => reject());
    });
  }

  private getTasks(): Observable<Task[]> {
    const tasks = this.afs.doc<User>(`users/${this.userId}`).get({source: 'default'}).pipe(map(item => item.data().tasks ? item.data().tasks : []));
    return tasks;
  }

  search(term: string) {
    return this.searchItem.next(term);
  }

  removeTask(taskId: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.getTasks().subscribe(tasks => {
        tasks = tasks.filter(task => task.id !== taskId);
        const userRef = this.afs.doc(`users/${this.userId}`);
        userRef.set({tasks}, {mergeFields: ['tasks']}).then(() => resolve(
        )).catch(() => reject());
      });
    });
  }

  bookMarkTask(taskId: string, isBookMark: boolean): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.getTasks().subscribe(tasks => {
        const task = tasks.find(item => item.id === taskId);
        if (task) {
          task.isBookmark = isBookMark;
        }
        const userRef = this.afs.doc(`users/${this.userId}`);
        userRef.set({tasks}, {mergeFields: ['tasks']}).then(() => resolve()).catch(() => reject());
      });
    });
  }

  setTask(task) {
    this.taskItem$.next(task);
  }

  setTaskFiltered(tasks: Task[]) {
    this.taskFiltered$.next(tasks);
  }
}
