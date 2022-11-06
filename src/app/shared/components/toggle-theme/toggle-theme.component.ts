import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-toggle-theme',
  templateUrl: './toggle-theme.component.html',
  styleUrls: ['./toggle-theme.component.scss']
})
export class ToggleThemeComponent implements OnInit {
  isDarkTheme = false;


  constructor() {
  }

  ngOnInit(): void {
    this.isDarkTheme = localStorage.getItem('dark-mode') === 'Dark' ? true : false;
    if (this.isDarkTheme) {
      document.body.classList.toggle('dark-theme');

    }

  }

  toggleTheme() {
    const darkMode = JSON.stringify(this.isDarkTheme);
    localStorage.setItem('dark-mode', darkMode);
    this.isDarkTheme = !this.isDarkTheme;
    document.body.classList.toggle('dark-theme');
  }

}
