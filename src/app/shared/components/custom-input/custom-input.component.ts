import {
  Component,
  Input,
  Renderer2,
  AfterViewInit,
  AfterViewChecked,
  RendererStyleFlags2,
  forwardRef
} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';

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
export class CustomInputComponent implements AfterViewInit, AfterViewChecked, ControlValueAccessor {
  @Input() formControl: FormControl = new FormControl();
  @Input() fontSizePx = '12';
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

    let element = document.querySelector('.' + this.name + ' .mat-form-field-appearance-outline.ng-invalid.ng-touched .mat-form-field-outline-thick');
    element && this._renderer.setStyle(element, 'opacity', 1);
    element && this._renderer.setStyle(element, 'color', this.borderDefaultColor, RendererStyleFlags2.Important);

    element = document.querySelector('.' + this.name + ' .mat-form-field-appearance-outline.mat-focused .mat-form-field-outline-thick');
    element && this._renderer.setStyle(element, 'color', this.borderSelectColor);

    element = document.querySelector('.' + this.name + ' .mat-form-field-appearance-outline.ng-valid.ng-touched .mat-form-field-outline-thick');
    element && this._renderer.setStyle(element, 'opacity', 1);
    element && this._renderer.setStyle(element, 'color', this.borderDefaultColor, RendererStyleFlags2.Important);

    if (this.isDisabled) {

      const elements = document.querySelectorAll('.' + this.name + ' .mat-form-field-flex .mat-form-field-outline *');
      elements.forEach((elem) => {
        this._renderer.setStyle(elem, 'background-color', this.disabledBackgroundColor);
      });

      const element = document.querySelector('.' + this.name + ' .mat-form-field-appearance-outline .mat-input-element:disabled');
      this._renderer.setStyle(element, 'color', 'unset');
    }
  }


}

