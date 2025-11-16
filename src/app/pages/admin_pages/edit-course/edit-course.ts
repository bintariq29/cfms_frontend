import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../../models/course_model';

@Component({
  selector: 'app-edit-course',
  imports: [FormsModule],
  templateUrl: './edit-course.html',
  styleUrl: './edit-course.css',
})
export class EditCourse {
  http = inject(HttpClient);
  route = inject(ActivatedRoute);

  courseId: number = 0;

  courseName = "";
  instructorName = "";
  totalFeedbacks = 0;
  isActive: boolean = true;


  ngOnInit() {
    this.courseId = Number(this.route.snapshot.paramMap.get("id"));
    this.getCourseDetails();
  }

  getCourseDetails() {
    this.http.get<any>("https://localhost:7212/GetCourse" + this.courseId)
      .subscribe(res => {
        this.courseName = res.courseName;
        this.instructorName = res.instructorName;
        this.totalFeedbacks = res.totalFeedbacks;
        this.isActive = res.isActive;
      })
  }

  updateCourse() {
    const obj: Course = {
      id: this.courseId,
      courseName: this.courseName,
      instructorName: this.instructorName,
      totalFeedbacks: 0,
      isActive: this.isActive
    };

    console.log("Sending:", obj);

    this.http.put<Course>(`https://localhost:7212/UpdateCourse/${this.courseId}`, obj)
      .subscribe({
        next: res => {
          alert("Course updated successfully!");
        },
        error: err => console.error(err)
      });
  }





}
