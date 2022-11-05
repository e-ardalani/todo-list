import {Component, OnInit} from '@angular/core';
// import {TaskService} from '../../../to-do-list/services/task.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isDarkTheme = false;


  // constructor(private taskService: TaskService) {
  // }

  ngOnInit(): void {
    this.isDarkTheme = localStorage.getItem('theme') === 'Dark' ? true : false;
  }

  // search(term: string) {
  //   this.taskService.search(term);
  // }


  toggleDarkTheme(): void {
    document.body.classList.toggle('dark-theme');
  }

}
