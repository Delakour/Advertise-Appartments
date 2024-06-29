import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdvertiserService } from 'src/service/advertiser.service';
import { CustomerService } from 'src/service/customer.service';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css']
})
export class PersonalDetailsComponent {
  constructor(public router: Router, public advs: AdvertiserService, public cus: CustomerService) { }
  loginForm: FormGroup = new FormGroup({})
  registerForm: FormGroup = new FormGroup({})
  hide: boolean = true

  refreshFormLogin() {
    this.loginForm = new FormGroup({
      "name": new FormControl(null, [Validators.required, Validators.pattern("[a-z A-Z א-ת]*")]),
      "email": new FormControl(null, [Validators.required, Validators.pattern("[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      "password": new FormControl(null, [Validators.required]),
    })
  }

  refreshFormRgister() {
    this.registerForm = new FormGroup({
      "name": new FormControl(null, [Validators.required, Validators.pattern("[a-z A-Z א-ת]*")]),
      "email": new FormControl(null, [Validators.required, Validators.pattern("[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      "password": new FormControl(null, [Validators.required]),
      "phone_1": new FormControl(null, [Validators.required, Validators.pattern("[0-9]*")]),
      "phone_2": new FormControl(null, [Validators.pattern("[0-9]*")])
    })
  }

  ngOnInit() {
    this.refreshFormLogin()
    this.refreshFormRgister()
  }

  get getNameLogin() {
    return this.loginForm.controls['name']
  }
  get getEmailLogin() {
    return this.loginForm.controls['email']
  }
  get getPasswordLogin() {
    return this.loginForm.controls['password']
  }

  login() {
    if (!this.getNameLogin.invalid && !this.getEmailLogin.invalid && !this.getPasswordLogin.invalid) {
      this.advs.login(this.loginForm.value).subscribe(
        suc => {
          this.advs.currentUser = suc
          this.advs.currentUser.email = this.getEmailLogin.value
          this.advs.currentUser.name = this.getNameLogin.value
          this.router.navigate([`showAll`])
        },
        err => {
          this.cus.login(this.loginForm.value).subscribe(
            suc => {
              this.cus.currentUser = suc
              this.cus.currentUser.email = this.getEmailLogin.value
              this.cus.currentUser.name = this.getNameLogin.value
              this.router.navigate([`showAll`])
            },
            err2 => {
              if (err2.error.message == 'customer not found!')
                alert("לקוח לא קיים, יש להרשם")
            }
          )
        }
      )

    }
    else {
      alert("טופס לא תקין")
    }
  }

  get getNameRegister() {
    return this.registerForm.controls['name']
  }
  get getEmailRegister() {
    return this.registerForm.controls['email']
  }
  get getPasswordRegister() {
    return this.registerForm.controls['password']
  }
  get getPhone1() {
    return this.registerForm.controls['phone_1']
  }
  get getPhone2() {
    return this.registerForm.controls['phone_2']
  }
  ableAdvertiser() {
    this.hide = !this.hide
  }
  register() {
    if (!this.hide) {
      if (!this.getNameRegister.invalid && !this.getEmailRegister.invalid
        && !this.getPasswordRegister.invalid && !this.getPhone1.invalid) {
        this.advs.register(this.registerForm.value).subscribe(
          suc => {
            this.advs.currentUser = suc
            this.advs.currentUser.name = this.getNameRegister.value
            this.router.navigate([`showAll`])
          },
          err => {
            if (err.error.message == 'advertiser email already exists!')
              alert("מפרסם קיים, לא ניתן להרשם שנית")
            else {
              this.cus.register(this.registerForm.value).subscribe(
                suc => {
                  this.cus.currentUser = suc
                  this.cus.currentUser.email = this.getEmailRegister.value
                  this.cus.currentUser.name = this.getNameRegister.value
                  this.router.navigate([`showAll`])
                },
                err2 => {
                  console.log("err2");
                  if (err.error.message == 'customer not found!')
                    alert("לקוח לא קיים, יש להרשם")
                }
              )
            }
          }
        )
      }
      else {
        alert("טופס לא תקין")
      }
    }
    else {
      if (!this.getNameRegister.invalid && !this.getEmailRegister.invalid
        && !this.getPasswordRegister.invalid && this.getPhone1.invalid) {
        this.cus.register(this.registerForm.value).subscribe(
          suc => {
            this.router.navigate([`showAll`])
          },
          err => {
            if (err.error.message == 'email already exists!')
              alert("לקוח קיים, לא ניתן להרשם שנית")
          }
        )
      }
      else {
        alert("טופס לא תקין")
      }
    }
  }
}