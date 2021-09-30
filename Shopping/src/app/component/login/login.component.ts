import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!:FormGroup;

  constructor(private formBuilder: FormBuilder, private _http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: ['']
    })
  }

  logIn(){
    this._http.get<any>("http://localhost:3000/users").subscribe(res=>{
      const username = res.find((a:any)=>{
        return a.username === this.loginForm.value.username && a.password === this.loginForm.value.password
      })
      if(username){
        alert("Login Successfull!");
        this.loginForm.reset();
        this.router.navigate(['Admin']);
        sessionStorage.setItem("key", "true");
      }else{
        alert("User Not Found");
      }
    },err=>{
      alert("Server Side Error!");
    })
  }

}
