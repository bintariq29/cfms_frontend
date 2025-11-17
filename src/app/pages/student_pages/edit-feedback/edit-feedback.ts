import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Feedback } from '../../../models/feedback_model';

@Component({
  selector: 'app-edit-feedback',
  imports: [FormsModule],
  templateUrl: './edit-feedback.html',
  styleUrls: ['./edit-feedback.css'],
})
export class EditFeedback implements OnInit {
  feedbackId: number = 0;
  comment: string = "";
  rating: number = 0;
  courseName: string = "dfadsfdafadf";
  studentName: string = "";
  http = inject(HttpClient);
  route = inject(ActivatedRoute);
  ngOnInit(): void {
    this.feedbackId = Number(this.route.snapshot.paramMap.get("id"));
    this.getFeedbackDetails();
  }

  getFeedbackDetails() {
    this.http.get<any>("https://localhost:7212/GetFeedbacksByFeedbackId/" + this.feedbackId)
      .subscribe(res => {
        // res is an array, so get first element
        const feedback = res[0];

        this.courseName = feedback.courseName;
        this.rating = feedback.rating;
        this.studentName = feedback.studentName;
        this.comment = feedback.comment;

        console.log(this.courseName, this.rating, this.studentName, this.comment);
      });
  }



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

  onUpdateFeedback() {
    const obj: Feedback = {
      id: this.feedbackId,
      comment: this.comment,
      studentName: this.studentName,
      attachment: this.attachmentBase64,
      rating: this.rating,
      courseName: this.courseName,
      courseId: 0,     // make sure this is set from getFeedbackDetails
      createdDate: new Date().toISOString()// optional, backend may ignore
    };

    console.log("Sending:", obj);

    this.http.put<Feedback>(`https://localhost:7212/UpdateFeedback/${this.feedbackId}`, obj)
      .subscribe({
        next: res => {
          console.log("Updated response:", res);
          alert("Feedback updated successfully!");
        },
        error: err => console.error(err)
      });
  }


}
