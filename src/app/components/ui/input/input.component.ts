import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Input() icon: any;
  @Input() type: string = 'text';
  @Input() name: string;
  @Input() placeholder: string;
  isFocused: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  focusHandler() {
    this.isFocused = true;
  }

  blurHandler() {
    this.isFocused = false;
  }

}
