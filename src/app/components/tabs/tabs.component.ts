import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  @Input() name: string = 'default-tabs';
  @Input() tabs: any[] = [];
  @Input() selectedTab: string;
  @Output() select = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  selectTab(selectedValue) {
    this.select.emit(selectedValue);
  }

}
