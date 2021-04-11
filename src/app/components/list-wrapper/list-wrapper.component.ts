import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-wrapper',
  templateUrl: './list-wrapper.component.html',
  styleUrls: ['./list-wrapper.component.scss']
})
export class ListWrapperComponent implements OnInit {
  @Input() title: string;
  @Input() footerText: string;

  constructor() { }

  ngOnInit(): void {
  }

}
