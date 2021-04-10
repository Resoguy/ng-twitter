import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit {
  @Input() src: string;
  @Input() alt: string;
  @Input() variant: string = 'circle';
  @Input() border: boolean = false;
  @Input() size: string = 'md';

  constructor() { }

  ngOnInit(): void {
  }

}
