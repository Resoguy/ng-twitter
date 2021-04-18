import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: InputComponent,
    multi: true
  }]
})
export class InputComponent implements OnInit, ControlValueAccessor {
  @Input() icon: any;
  @Input() type: string = 'text';
  @Input() name: string;
  @Input() placeholder: string = '';
  @Input() variant: string = 'normal';
  @Input() label: string;
  isFocused: boolean = false;
  value: string;
  onChange: (value: string) => void;
  onTouched: () => void;

  get dynamicClasses() {
    return `${this.variant}`;
  }

  constructor() { }

  ngOnInit(): void {
  }

  focusHandler() {
    this.isFocused = true;
  }

  blurHandler() {
    this.isFocused = false;
    this.onTouched();
  }

  writeValue(value: string) {
    this.value = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

}
