import { Component, inject, OnInit } from '@angular/core';
import { Feedback } from '../../../models/feedback_model';
import { ActivatedRoute } from '@angular/router';
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
  ngOnInit(): void {
    this.name = String(this.route.snapshot.paramMap.get('name'));
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.getFeedBackByCourseIdAndStudentName(this.name, this.id);
  }
  http = inject(HttpClient);

  feedbacks: Feedback[] = [];
  getFeedBackByCourseIdAndStudentName(name: string, id:number) {
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

}
