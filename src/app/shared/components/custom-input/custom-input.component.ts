import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true
    }
  ]
})
export class CustomInputComponent implements OnInit {
  @Input() formControl: FormControl = new FormControl();
  @Input() type = 'text';
  @Input() placeholder = '';
  matInputValue: any;


  constructor() {
  }

  ngOnInit(): void {
  }



  writeValue(obj: any): void {
    this.matInputValue = obj;
  }

  registerOnChange(fn: any): void {
    this.onMatInputChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onInputClicked = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
  }

  onMatInputChange(event) {
    this.matInputValue = event;
  }

  onInputClicked(event) {
  }


}
