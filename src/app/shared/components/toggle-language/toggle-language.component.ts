import {Component, EventEmitter, Inject, LOCALE_ID, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-toggle-language',
  templateUrl: './toggle-language.component.html',
  styleUrls: ['./toggle-language.component.scss']
})
export class ToggleLanguageComponent {
  lang = 'En';
  @Output() selectLang = new EventEmitter();

  locales = [
    {code: 'en', name: 'En'},
    {code: 'fa', name: 'Fa'},
  ];

  constructor(@Inject(LOCALE_ID) public activeLocale: string
  ) {
  }


  onChange() {
    window.location.href = `/todo-list/${this.activeLocale}`;
  }

}
