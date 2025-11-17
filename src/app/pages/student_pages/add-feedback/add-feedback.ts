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
  router = inject(Router);
  ngOnInit(): void {
    this.courseName = String(this.route.snapshot.paramMap.get('course'));

    this.instructorName = String(this.route.snapshot.paramMap.get('instructor'));
  }
  comment = "";
  rating: number | null = null;
  attachment: File | null = null;

  onFileSelect(event: any) {
    this.attachment = event.target.files[0];
  }

  onSaveFeedback() {
    alert("Feedback Saved!");
  }

}
