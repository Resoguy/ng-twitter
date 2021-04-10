import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit {
  @Input() size: string = 'md';
  @Input() color: string = 'white';
  @Input() weight: string = 'normal';

  constructor() { }

  ngOnInit(): void {
  }

}
