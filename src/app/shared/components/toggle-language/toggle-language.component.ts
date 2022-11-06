import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-toggle-language',
  templateUrl: './toggle-language.component.html',
  styleUrls: ['./toggle-language.component.scss']
})
export class ToggleLanguageComponent implements OnInit {
  lang = 'En';
  @Output() selectLang = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
    this.lang = localStorage.getItem('lang') === 'En' ? 'En' : 'Fa';
  }

  toggleLang() {
    const lang = JSON.stringify(this.lang);
    localStorage.setItem('lang', lang);
    this.lang = (this.lang === 'En') ? 'Fa' : 'En';
    this.selectLang.emit(this.lang);
  }

}
