import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownLinkComponent } from './dropdown-link.component';

describe('DropdownLinkComponent', () => {
  let component: DropdownLinkComponent;
  let fixture: ComponentFixture<DropdownLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropdownLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
