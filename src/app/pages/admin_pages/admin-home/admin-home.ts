import { Component, inject, OnInit } from '@angular/core';
import { Course } from '../../../models/course_model';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  imports: [CommonModule],
  templateUrl: './admin-home.html',
  styleUrl: './admin-home.css',
})
export class AdminHome implements OnInit {
  http = inject(HttpClient);
  router = inject(Router)
  activeMenuIndex: number | null = null;

  ngOnInit() {
    this.getCourse()

  }

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
    this.router.navigateByUrl("/add_course");
  }

  onShowFeedback(course: Course) {
    debugger;
    this.router.navigate(['/feedback', course.id]);
  }

  toggleMenu(index: number) {
    if (this.activeMenuIndex === index) {
      this.activeMenuIndex = null; // close if already open
    } else {
      this.activeMenuIndex = index;
    }
  }

  onEditCourse(course: Course) { alert(`Edit ${course.courseName}`); }
  onDeleteCourse(course: Course) { alert(`Delete ${course.courseName}`); }

}
