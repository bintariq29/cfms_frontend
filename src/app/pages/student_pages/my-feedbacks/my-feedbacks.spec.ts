import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFeedbacks } from './my-feedbacks';

describe('MyFeedbacks', () => {
  let component: MyFeedbacks;
  let fixture: ComponentFixture<MyFeedbacks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyFeedbacks]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyFeedbacks);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
