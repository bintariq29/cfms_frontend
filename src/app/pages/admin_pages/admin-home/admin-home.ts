import { Component, inject, OnInit } from '@angular/core';
import { Course } from '../../../models/course_model';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-home',
  imports: [CommonModule],
  templateUrl: './admin-home.html',
  styleUrl: './admin-home.css',
})
export class AdminHome implements OnInit {
  ngOnInit() {
    this.getCourse()

  }
  http = inject(HttpClient);
  courses: Course[] = [];
  getCourse() {
    this.http.get<Course[]>('https://localhost:7212/GetCourses')
      .subscribe({
        next: (data) => {
          debugger;
          this.courses = data;
          alert(`Courses loaded ${this.courses}`);
          console.log('Courses loaded:', this.courses);
        },
        error: (err) => {
          console.error('Error fetching courses:', err);
        }
      });
  }
  onAddCourse() {
    alert('Add Course clicked');
    // Navigate or open modal for adding a course
  }

  onShowFeedback(course: Course) {
    alert(`Show all feedbacks for ${course.courseName}`);
    // Navigate or open feedbacks for this course
  }

}
