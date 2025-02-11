import { Component } from '@angular/core';
import { Router } from '@angular/router';
import axios from "axios";
// import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  // imports:[FormsModule] ,
  // standalone:true
})
export class SignupComponent {
  formData = {
    firstName: "",
    lastName: "",
    phoneNo: "",
    email: "",
    password: "",
    gender: "",
    termsAccepted: false,
};
constructor(private router:Router){}

async submitForm() {
  try {
    const response = await axios.post("http://localhost:5000/auth/signup", this.formData);
    alert(response.data.message);
    this.router.navigate(["/login"]);
  } catch (error) {
    alert("Error submitting form.");
  }
}

}
