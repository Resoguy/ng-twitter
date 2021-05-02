import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendedUsersComponent } from './recommended-users.component';

describe('RecommendedUsersComponent', () => {
  let component: RecommendedUsersComponent;
  let fixture: ComponentFixture<RecommendedUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecommendedUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
