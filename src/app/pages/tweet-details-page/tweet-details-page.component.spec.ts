import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetDetailsPageComponent } from './tweet-details-page.component';

describe('TweetDetailsPageComponent', () => {
  let component: TweetDetailsPageComponent;
  let fixture: ComponentFixture<TweetDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TweetDetailsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TweetDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
