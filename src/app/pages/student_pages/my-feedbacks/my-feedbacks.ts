import { Component, inject, OnInit } from '@angular/core';
import { Feedback } from '../../../models/feedback_model';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-my-feedbacks',
  imports: [CommonModule],
  templateUrl: './my-feedbacks.html',
  styleUrl: './my-feedbacks.css',
})
export class MyFeedbacks implements OnInit {
  constructor(private route: ActivatedRoute) { }
  name: string = '';
  id: number = 0;
  activeMenuIndex: number | null = null;
  ngOnInit(): void {
    this.name = String(this.route.snapshot.paramMap.get('name'));
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.getFeedBackByCourseIdAndStudentName(this.name, this.id);
  }
  http = inject(HttpClient);
  router = inject(Router)

  feedbacks: Feedback[] = [];
  getFeedBackByCourseIdAndStudentName(name: string, id: number) {
    debugger;
    this.http.get<Feedback[]>(`https://localhost:7212/GetFeedbacksByStudent/${name}/${id}`)
      .subscribe({
        next: (data) => {
          this.feedbacks = data;
          alert(`Feedbacks loaded ${this.feedbacks}`);
          console.log('Courses loaded:', this.feedbacks);
        },
        error: (err) => {
          console.error('Error fetching feedbacks:', err);
          alert(`${err}`);
        }
      });
  }

  download(attachment: string, fileName: string = "attachment.pdf") {
    if (!attachment) {
      alert("No attachment found!");
      return;
    }

    // Convert Base64 → byte array
    const byteCharacters = atob(attachment);
    const byteNumbers = new Array(byteCharacters.length)
      .fill(0)
      .map((_, i) => byteCharacters.charCodeAt(i));

    const byteArray = new Uint8Array(byteNumbers);

    // Detect file type (basic)
    let mimeType = "application/octet-stream";

    if (attachment.startsWith("JVBER")) {
      mimeType = "application/pdf";
      if (!fileName.endsWith(".pdf")) fileName += ".pdf";
    }
    if (attachment.startsWith("/9j/")) {
      mimeType = "image/jpeg";
      if (!fileName.endsWith(".jpg")) fileName += ".jpg";
    }
    if (attachment.startsWith("iVBOR")) {
      mimeType = "image/png";
      if (!fileName.endsWith(".png")) fileName += ".png";
    }

    const blob = new Blob([byteArray], { type: mimeType });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();

    URL.revokeObjectURL(url);
  }

  toggleMenu(index: number) {
    if (this.activeMenuIndex === index) {
      this.activeMenuIndex = null; // close if already open
    } else {
      this.activeMenuIndex = index;
    }
  }


  onEditFeedback(feedback: Feedback) {
    this.router.navigate(['/edit_course', feedback.id]);
  }


  onDeleteFeedback(feedback: Feedback) {
    if (confirm(`Are you sure you want to delete the Feedback: "${feedback.comment}"?`)) {
      this.http.delete(`https://localhost:7212/DeleteFeedbackById/${feedback.id}`)
        .subscribe({
          next: () => {
            alert(`Feedback "${feedback.comment}" deleted successfully!`);
            // Remove the deleted course from the list
            this.feedbacks = this.feedbacks.filter(c => c.id !== feedback.id);
          },
          error: (err) => {
            console.error('Error deleting feedback:', err);
            alert('Failed to delete the feedback.');
          }
        });
    }
  }

}
