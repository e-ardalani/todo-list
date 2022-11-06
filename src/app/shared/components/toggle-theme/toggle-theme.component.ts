import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-toggle-theme',
  templateUrl: './toggle-theme.component.html',
  styleUrls: ['./toggle-theme.component.scss']
})
export class ToggleThemeComponent implements OnInit {
  isDarkTheme = false;
  @Output() darkMode = new EventEmitter();
  theme;


  constructor() {
  }

  ngOnInit(): void {
    this.theme = localStorage.getItem('dark-mode');
    if (this.theme) {
      this.isDarkTheme = localStorage.getItem('dark-mode') === 'Dark' ? true : false;
    }
    if (this.isDarkTheme) {
      document.body.classList.toggle('dark-theme');

    }

  }


  toggleTheme() {
    // const darkMode = JSON.stringify(this.isDarkTheme);
    // console.log(darkMode);
    // localStorage.setItem('dark-mode', (!this.theme) ? 'true': this.isDarkTheme);
    this.isDarkTheme = !this.isDarkTheme;
    document.body.classList.toggle('dark-theme');
    this.darkMode.emit(this.isDarkTheme);

  }

}
