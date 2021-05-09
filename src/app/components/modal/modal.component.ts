import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() isOpen: boolean = false;
  @Output() onClose = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  close() {
    this.onClose.emit();
  }

}
