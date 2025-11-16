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

  onEditCourse(course: Course) {
    this.router.navigate(['/edit_course', course.id]);
  }


  onDeleteCourse(course: Course) {
    if (confirm(`Are you sure you want to delete the course "${course.courseName}"?`)) {
      this.http.delete(`https://localhost:7212/DeleteCourse/${course.id}`)
        .subscribe({
          next: () => {
            alert(`Course "${course.courseName}" deleted successfully!`);
            // Remove the deleted course from the list
            this.courses = this.courses.filter(c => c.id !== course.id);
          },
          error: (err) => {
            console.error('Error deleting course:', err);
            alert('Failed to delete the course.');
          }
        });
    }
  }

}
