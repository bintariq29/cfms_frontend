import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  router = inject(Router)
  loginOnTap() {
    this.router.navigateByUrl("/login")

  }

}
