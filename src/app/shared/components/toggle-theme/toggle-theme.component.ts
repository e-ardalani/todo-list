import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-toggle-theme',
  templateUrl: './toggle-theme.component.html',
  styleUrls: ['./toggle-theme.component.scss']
})
export class ToggleThemeComponent implements OnInit {
  isDarkTheme: boolean;
  @Output() darkMode = new EventEmitter();
  theme;


  constructor() {
  }

  ngOnInit(): void {
    this.theme = JSON.parse(localStorage.getItem('dark-mode'));
    if (this.theme) {
      this.isDarkTheme = this.theme;
    }
    this.isDarkTheme ? document.body.classList.toggle('dark-theme') : document.body.classList.toggle('light-theme');


  }


  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    console.log(this.isDarkTheme);
    if (this.isDarkTheme) {
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
    }
    localStorage.setItem('dark-mode', JSON.stringify(this.isDarkTheme));
    this.darkMode.emit(this.isDarkTheme);

  }

}
