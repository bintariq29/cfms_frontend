import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-feedback',
  imports: [FormsModule],
  templateUrl: './add-feedback.html',
  styleUrl: './add-feedback.css',
})
export class AddFeedback implements OnInit {
  constructor(private route: ActivatedRoute) { }
  instructorName = "";
  courseName = "";
  //
  courseId = 0;

  studentName = "";
  router = inject(Router);
  http = inject(HttpClient);
  ngOnInit(): void {
    this.courseName = String(this.route.snapshot.paramMap.get('course'));

    this.instructorName = String(this.route.snapshot.paramMap.get('instructor'));
    this.studentName = String(this.route.snapshot.paramMap.get('student_name'));

    this.courseId = Number(this.route.snapshot.paramMap.get('course_id'));
  }
  comment = "";
  rating: number | null = null;
  attachment: File | null = null;
  attachmentBase64: string | null = null;

  onFileSelect(event: any) {
    this.attachment = event.target.files[0];

    if (this.attachment) {
      const reader = new FileReader();

      reader.onload = () => {
        const result = reader.result as string;
        // FileReader ka result by default Base64 string (with prefix)
        // "data:application/pdf;base64,JVBERi0xLjQK..."
        this.attachmentBase64 = result.split(',')[1]; // remove prefix
      };

      reader.readAsDataURL(this.attachment);
    }
  }


  onSaveFeedback() {
    if (!this.attachmentBase64) {
      alert("Please select a file first!");
      return;
    }

    const newFeedback = {
      studentName: this.studentName,
      instructorName: this.instructorName,
      courseId: this.courseId,
      courseName: this.courseName,
      comment: this.comment,
      rating: this.rating,
      attachment: this.attachmentBase64 // JSON me number array
    };

    // POST JSON to backend
    this.http.post('https://localhost:7212/AddFeedback', newFeedback, {
      headers: { 'Content-Type': 'application/json' }
    })
      .subscribe({
        next: (res) => {
          alert("Feedback added successfully!");
          console.log(res);
          this.router.navigateByUrl("/student_home");
        },
        error: (err) => {
          console.error(err);
          alert("Error adding feedback");
        }
      });
  }



}
