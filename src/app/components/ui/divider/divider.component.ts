import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-divider',
  templateUrl: './divider.component.html',
  styleUrls: ['./divider.component.scss']
})
export class DividerComponent implements OnInit {
  @Input() marginless: boolean = true;
  @Input() size: string = 'md';

  get dynamicClasses() {
    return `${this.size}`;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
