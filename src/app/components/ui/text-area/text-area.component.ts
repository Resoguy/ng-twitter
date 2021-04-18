import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss']
})
export class TextAreaComponent implements OnInit {
  @Input() cols: string = '30';
  @Input() rows: string = '5';
  @Input() placeholder: string;
  @Input() name: string;
  

  constructor() { }

  ngOnInit(): void {
  }

}
