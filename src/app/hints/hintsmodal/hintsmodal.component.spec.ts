import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HintsmodalComponent } from './hintsmodal.component';

describe('HintsmodalComponent', () => {
  let component: HintsmodalComponent;
  let fixture: ComponentFixture<HintsmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HintsmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HintsmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
