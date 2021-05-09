import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dropdown-link',
  templateUrl: './dropdown-link.component.html',
  styleUrls: ['./dropdown-link.component.scss']
})
export class DropdownLinkComponent implements OnInit {
  @Input() icon;
  @Input() menuItems: any[];
  @Input() direction: string = 'down'; // 'up'
  @Input() fab: boolean = false;
  isMenuOpen: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleMenu(event) {
    event.stopPropagation();
    
    this.isMenuOpen = !this.isMenuOpen;
  }

}
