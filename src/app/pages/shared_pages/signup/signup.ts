import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../models/user_model';

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

    const user: User = {
      userId: 0,
      userName: "BinTariq",
      password: "123",
      userType: "admin"
    };


    this.http.post("https://localhost:7212/api/User", user).subscribe({
      next: (res) => {
        console.log("Response:", res);
        alert("User registered successfully!");
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
