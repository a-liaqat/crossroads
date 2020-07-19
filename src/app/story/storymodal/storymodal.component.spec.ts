import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorymodalComponent } from './storymodal.component';

describe('StorymodalComponent', () => {
  let component: StorymodalComponent;
  let fixture: ComponentFixture<StorymodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorymodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorymodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
