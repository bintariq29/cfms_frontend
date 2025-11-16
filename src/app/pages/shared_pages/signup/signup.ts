import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../models/user_model';
import { retry } from 'rxjs';

@Component({
  selector: 'app-signup',
  imports: [FormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  router = inject(Router);
  http = inject(HttpClient);
  password = "";
  confirmPassword = "";
  userType = "";
  username = "";
  loginOnTap() {
    this.router.navigateByUrl("/login")
  }

  signUpFunc() {
    if (!this.username || this.username.trim() === "") {
      alert("Username is empty!");
      return;
    }

    if (!this.password || this.password.trim() === "") {
      alert("Password is empty!");
      return;
    }

    if (!this.confirmPassword || this.confirmPassword.trim() === "") {
      alert("Confirm Password is empty!");
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!this.userType || this.userType.trim() === "") {
      alert("UserType is required!");
      return;
    }

    const user: User = {
      userId: 0,
      userName: this.username,
      password: this.password,
      userType: this.userType
    };


    this.http.post("https://localhost:7212/api/User", user).subscribe({
      next: (res) => {
        debugger
        if (this.userType == "admin") {
          this.router.navigateByUrl("/admin_home")
        }
        if (this.userType == "student") {
          this.router.navigateByUrl("/student_home")
        }

      },
      error: (err) => {
        console.error("Error:", err);
        alert("API Error: " + JSON.stringify(err.error));
      }
    });


  }

}

// alert(`USERNAME: ${this.username}, USERTYPE: ${this.userType},
//     //   PASSWORD: ${this.password}, CONFIRM_PASSWORD: ${this.confirmPassword} `);
