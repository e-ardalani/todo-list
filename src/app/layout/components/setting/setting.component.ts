import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  isDarkTheme = false;

  constructor() {
  }

  ngOnInit(): void {
    this.isDarkTheme = localStorage.getItem('theme') === 'Dark' ? true : false;

  }

  onToggle(event): void {
    this.isDarkTheme = event.checked;
    document.body.classList.toggle('dark-theme');
  }
}
