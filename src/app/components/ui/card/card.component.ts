import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() variant: string = 'basic';
  @Input() relative: boolean = false;
  @Input() padding: boolean = false;

  get dynamicClasses() {
    return `${this.variant}`;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
