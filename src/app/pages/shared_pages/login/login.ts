import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  router = inject(Router)
  username = "";
  password = "";
  http = inject(HttpClient)
  onSignupTap() {
    this.router.navigateByUrl("/signup")
  }
  onLoginTap() {
    if (!this.username || this.username.trim() === "") {
      alert("Username is empty!");
      return;
    }

    if (!this.password || this.password.trim() === "") {
      alert("Password is empty!");
      return;
    }

    const url = "https://localhost:7212/api/User/" + this.username;
    this.http.get<any>(url).subscribe({
      next: (res) => {
        console.log("API Response:", res);

        // Check password
        if (res.password === this.password) {
          alert("Login Successful!");
          if (res.userType == "admin") {
            this.router.navigateByUrl("/admin_home")
          }
          if (res.userType == "student") {
            this.router.navigateByUrl("/student_home")
          }
        } else {
          alert("Incorrect Password!");
          return;
        }
      },
      error: (err) => {
        console.error("API Error:", err);
        alert(`User not found or server error! ${err}`);
      }
    });


  }
}
