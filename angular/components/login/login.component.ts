import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdvertiserService } from 'src/service/advertiser.service';
import { CustomerService } from 'src/service/customer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  constructor(public router:Router, public advs:AdvertiserService, public cus:CustomerService){}
  loginForm:FormGroup = new FormGroup({})

  refreshForm(){
    this.loginForm = new FormGroup({
      "name": new FormControl(null, [Validators.required, Validators.pattern("[a-z A-Z א-ת]*")]),
      "email": new FormControl(null, [Validators.required, Validators.pattern("[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      "password":new FormControl(null, [Validators.required]),
    })
  }

  ngOnInit(){
    this.refreshForm()
  }

  get getName(){
    return this.loginForm.controls['name']
  }
  get getEmail(){
    return this.loginForm.controls['email']
  }
  get getPassword(){
    return this.loginForm.controls['password']
  }

  login(){
    if(!this.getName.invalid && !this.getEmail.invalid && !this.getPassword.invalid){
      this.advs.login(this.loginForm.value).subscribe(
        suc=> {
          this.advs.currentUser = suc
          
          this.advs.currentUser.email = this.getEmail.value
          this.advs.currentUser.name = this.getName.value
          this.router.navigate([`showAll`])
        },
        err => {
          this.cus.login(this.loginForm.value).subscribe(
            suc=> {
              this.cus.currentUser = suc
              this.cus.currentUser.email = this.getEmail.value
              this.cus.currentUser.name = this.getName.value
              this.router.navigate([`showAll`])
            },
            err2 => {
              console.log(err2)
            }
          )
        }
      )
      
    }
    else{
      alert("טופס לא תקין")
    }
  }
}
