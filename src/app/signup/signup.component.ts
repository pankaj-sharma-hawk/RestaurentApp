import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  formValue!:FormGroup;
  
  constructor(private formBuilder:FormBuilder,private http:HttpClient,private rounter:Router) { }

  ngOnInit(): void {
    this.formValue=this.formBuilder.group({
      name:[''],
      mobileNumber:[''],
      email:[''],
      password:['']
    });
  }

  signUp(){
    this.http.post("http://localhost:3000/signup",this.formValue.value).subscribe(res=>{
      alert("Registeration Successfully");
      this.formValue.reset();
      this.rounter.navigate(['login']);
    },err=>{
      alert("Chicha Galat kiye ho kch..");
    });
  }

}
