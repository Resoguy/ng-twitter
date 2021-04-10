import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() variant: string = 'primary';
  @Input() size: string = 'md';

  constructor() { }

  ngOnInit(): void {
  }

}
