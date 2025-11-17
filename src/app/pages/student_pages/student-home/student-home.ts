import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../../../models/course_model';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-home',
  imports: [CommonModule],
  templateUrl: './student-home.html',
  styleUrl: './student-home.css',
})
export class StudentHome implements OnInit {
  constructor(private route: ActivatedRoute) { }
  studentName: String = "";
  allCourses: Course[] = [];
  http = inject(HttpClient);
  router = inject(Router)
  getCourse() {
    this.http.get<Course[]>('https://localhost:7212/GetCourses')
      .subscribe({
        next: (data) => {
          debugger;
          this.allCourses = data;
          alert(`Courses loaded ${this.allCourses}`);
          console.log('Courses loaded:', this.allCourses);
        },
        error: (err) => {
          console.error('Error fetching courses:', err);
        }
      });
  }
  ngOnInit(): void {
    this.studentName = String(this.route.snapshot.paramMap.get('name'));
    this.getCourse();
  }

  showMyFeedback(course: Course) {
    debugger;
    this.router.navigate(['/my_feedback', this.studentName, course.id]);
  }

  addFeedBack(course: Course) {
    this.router.navigate(["/add_feedback", course.courseName, course.instructorName]);
  }



}
