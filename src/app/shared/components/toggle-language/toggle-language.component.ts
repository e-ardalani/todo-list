import {Component, EventEmitter, Inject, LOCALE_ID, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-toggle-language',
  templateUrl: './toggle-language.component.html',
  styleUrls: ['./toggle-language.component.scss']
})
export class ToggleLanguageComponent implements OnInit {
  lang = 'En';
  @Output() selectLang = new EventEmitter();

  locales = [
    {code: 'en', name: 'En'},
    {code: 'fa', name: 'Fa'},
  ];

  constructor(@Inject(LOCALE_ID) public activeLocale: string
  ) {
  }

  ngOnInit(): void {
    this.lang = localStorage.getItem('lang') === 'en' ? 'en' : 'fa';
    this.activeLocale = this.lang;
  }


  onChange() {
    const lang = JSON.stringify(this.lang);
    localStorage.setItem('lang', lang);
    this.lang = (this.lang === 'en') ? 'fa' : 'en';
    this.selectLang.emit(this.lang);
    this.activeLocale = this.lang;
    window.location.href = `/todo-list/${this.activeLocale}`;
  }

  // toggleLang() {
  //   const lang = JSON.stringify(this.lang);
  //   localStorage.setItem('lang', lang);
  //   this.lang = (this.lang === 'En') ? 'Fa' : 'En';
  //   this.selectLang.emit(this.lang);
  // }

}
