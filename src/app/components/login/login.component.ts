import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Credential } from 'src/app/module';
import { CredentialService } from '../../services/credential.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  credential: Credential = {
    Email: '',
    Password: '',
    ConfirmPassword: '',
    Role: "Member",
  };
  access_token: string = '';
  isLogin: boolean = true;
  errorList: string[] = [];
  error: string = '';

  constructor(private credentialService: CredentialService) { }

  ngOnInit(): void {
  }

  switchMode(): void {
    this.isLogin = !this.isLogin
    this.errorList = []
  }

  handleSubmit(form: NgForm): void {
    this.errorList = [];
    this.error = '';

    if (!this.isLogin) {
      if (form.valid) {
        this.credential = {
          ... this.credential,
          Email: form.value.Email,
          Password: form.value.Password,
          ConfirmPassword: form.value.ConfirmPassword
        }
        this.credentialService.register(this.credential)
          .subscribe(res => {
            this.credentialService.getAccessToken(this.credential)
              .subscribe(res => {
                this.access_token = res.access_token;
                localStorage.setItem('access_token', res.access_token);
                window.location.href = "/";
              });
          },
            err => {
              const result = Object.keys(err.error.ModelState)
              result.forEach(key => this.errorList.push(err.error.ModelState[key]));
            });
      }
      else {
        if (!form.value.Email || !form.value.Password || !form.value.ConfirmPassword)
          this.error = "Please fill the required form";
        else {
          this.error = "Email is not valid";
        }
      }
    }
    else {
      if (form.valid) {
        this.credential = {
          ... this.credential,
          Email: form.value.Email,
          Password: form.value.Password,
        }

        this.credentialService.getAccessToken(this.credential)
          .subscribe(res => {
            this.access_token = res.access_token;
            localStorage.setItem('access_token', res.access_token);
            console.log('is it refresh ?')
            window.location.href = "/";
          },
            err => {
              this.error = err.error.error_description
              console.log(this.error)
            });
      }
      else {
        if (!form.value.Email || !form.value.Password)
          this.error = "Please fill the required form";
        else {
          this.error = "Email is not valid";
        }
      }
    }
  }
}
