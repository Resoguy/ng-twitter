import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: TextAreaComponent,
    multi: true
  }]
})
export class TextAreaComponent implements OnInit, ControlValueAccessor {
  @Input() cols: string = '30';
  @Input() rows: string = '5';
  @Input() placeholder: string;
  @Input() name: string;
  value: string;
  onChange: (value:string) => void;
  onTouched: () => void;
  

  constructor() { }

  ngOnInit(): void {
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
