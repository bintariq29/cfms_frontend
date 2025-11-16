import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-course',
  imports: [FormsModule],
  templateUrl: './add-course.html',
  styleUrl: './add-course.css',
})
export class AddCourse {

  http = inject(HttpClient);

  courseName: string = '';
  instructorName: string = '';
  totalFeedbacks: number = 0;
  isActive: boolean = true;


  onAddCourse() {
    if (!this.courseName || !this.instructorName) {
      alert("Please fill all required fields");
      return;
    }

    const newCourse = {
      courseName: this.courseName,
      instructorName: this.instructorName,
      totalFeedbacks: this.totalFeedbacks,
      isActive: this.isActive
    };

    // Replace with your backend API endpoint
    this.http.post('https://localhost:7212/AddCourse', newCourse)
      .subscribe({
        next: (res) => {
          alert("Course added successfully!");
          console.log(res);
        },
        error: (err) => {
          console.error(err);
          alert("Error adding course");
        }
      });
  }

}
