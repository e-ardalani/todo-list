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
    this.isDarkTheme = localStorage.getItem('theme') === 'Dark' ? true : false;

  }

  toggleTheme() {
    const darkMode = JSON.stringify(this.isDarkTheme);
    localStorage.setItem('theme', darkMode);
    this.isDarkTheme = !this.isDarkTheme;
    document.body.classList.toggle('dark-theme');
  }

}
