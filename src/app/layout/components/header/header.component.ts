import {Component} from '@angular/core';
import {TaskService} from '../../../pages/todo-list/services/task.service';
import {UserInfoDialogComponent} from '../user-info-dialog/user-info-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {


  constructor(private taskService: TaskService,
              public dialog: MatDialog,
  ) {
  }


  search(term: string) {
    this.taskService.search(term);
  }


  openDialogUser() {
    this.dialog.open(UserInfoDialogComponent, {
      disableClose: false,
    });
  }


}
