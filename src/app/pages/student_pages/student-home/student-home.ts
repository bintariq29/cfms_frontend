import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-home',
  imports: [],
  templateUrl: './student-home.html',
  styleUrl: './student-home.css',
})
export class StudentHome implements OnInit {
  constructor(private route: ActivatedRoute) { }
  studentName: String = "";
  ngOnInit(): void {
    this.studentName = String(this.route.snapshot.paramMap.get('name'));
  }


}
