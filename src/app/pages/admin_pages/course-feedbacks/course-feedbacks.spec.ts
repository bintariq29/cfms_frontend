import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseFeedbacks } from './course-feedbacks';

describe('CourseFeedbacks', () => {
  let component: CourseFeedbacks;
  let fixture: ComponentFixture<CourseFeedbacks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseFeedbacks]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseFeedbacks);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
