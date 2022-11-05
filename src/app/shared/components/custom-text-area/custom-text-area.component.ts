import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Renderer2,
  ElementRef,
  AfterViewInit,
  AfterViewChecked,
  RendererStyleFlags2,
  forwardRef
} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';

@Component({
  selector: 'app-custom-text-area',
  templateUrl: './custom-text-area.component.html',
  styleUrls: ['./custom-text-area.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomTextAreaComponent),
      multi: true
    }
  ]
})
export class CustomTextAreaComponent implements OnInit, OnDestroy, AfterViewInit, AfterViewChecked, ControlValueAccessor {
  @Input() formControl: FormControl = new FormControl();
  @Input() fontSizePx = '14';
  @Input() name = '';
  @Input() label = '';
  @Input() appearance = 'outline';
  @Input() labelColor = '#484848';
  @Input() borderDefaultColor = '#e2e2e2';
  @Input() borderSelectColor = 'blue';
  @Input() disabledBackgroundColor = '#f8f8f8';
  @Input() borderWidthPx = '1';
  @Input() required = false;
  @Input() withLabel = true;
  @Input() placeholder = '';
  @Input() showUnderlineErrorContainer = true;
  @Input() isDisabled = false;
  @Input() errorMessages: { [key: string]: string } = {};

  matInputValue: any;

  constructor(
    private _renderer: Renderer2
  ) {
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
    this.isDisabled = isDisabled;
  }

  onMatInputChange(event) {
    this.matInputValue = event;
  }

  onInputClicked(event) {
  }

  getErrorMessages(errors) {

    return this.errorMessages[Object.keys(errors)[0]];
  }

  ngAfterViewInit(): void {
    let element = document.querySelector('.' + this.name + ' .mat-form-field-appearance-outline .mat-form-field-outline');
    this._renderer.setStyle(element, 'color', this.borderDefaultColor);

    element = document.querySelector('.' + this.name + ' .mat-form-field-appearance-outline .mat-form-field-outline-thick');
    this._renderer.setStyle(element, 'color', this.borderDefaultColor);

    let elements = document.querySelectorAll('.' + this.name + ' .mat-form-field-flex .mat-form-field-outline *');
    elements.forEach((elem) => {
      this._renderer.setStyle(elem, 'border-width', this.borderWidthPx + 'px');
    });

    element = document.querySelector('.' + this.name + ' .mat-form-field-wrapper');
    !this.showUnderlineErrorContainer && this._renderer.setStyle(element, 'padding-bottom', '0px');
  }

  ngAfterViewChecked(): void {

    let element;

    element = document.querySelector('.' + this.name + ' .mat-form-field-appearance-outline.mat-focused .mat-form-field-outline-thick');
    element && this._renderer.setStyle(element, 'color', this.borderSelectColor);


    if (this.isDisabled) {

      const elements = document.querySelectorAll('.' + this.name + ' .mat-form-field-flex .mat-form-field-outline *');
      elements.forEach((elem) => {
        this._renderer.setStyle(elem, 'background-color', this.disabledBackgroundColor);
      });

      const element = document.querySelector('.' + this.name + ' .mat-form-field-appearance-outline .mat-input-element:disabled');
      this._renderer.setStyle(element, 'color', 'unset');
    }
  }

  ngOnInit(): void {

  }


  ngOnDestroy(): void {

  }

}
