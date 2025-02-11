import { Component } from '@angular/core';
import axios from "axios";
import { Router } from "@angular/router";
// import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  // imports:[FormsModule] ,
})
export class LoginComponent {
  formData = {
    email: "",
    password: "",
};



constructor(private router: Router) {}
async login() {
  try {
    const response = await axios.post("http://localhost:5000/auth/login", this.formData);
    alert(response.data.message);
    localStorage.setItem("token", response.data.token);
    this.router.navigate(["/dashboard"]); 
  } catch (error) {
    alert("Login failed! Check your credentials.");
  }
}
}