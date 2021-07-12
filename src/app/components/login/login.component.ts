import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  constructor(private credentialService: CredentialService) { }

  ngOnInit(): void {
  }

  switchMode(): void {
    this.isLogin = !this.isLogin
  }

  handleSubmit(form: NgForm): void {
    this.errorList = [];
    if (!this.isLogin) {
      if (form.valid) {
        if (form.value.Password !== form.value.ConfirmPassword) {
          this.errorList.push("Password does not match");
          return;
        }
        else {
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
                },
                  err => {
                    console.log(err);
                  });
            },
              err => {
                const result = Object.keys(err.error.ModelState)
                result.forEach(key => this.errorList.push(err.error.ModelState[key]));
              });
        }
      }
      else {
        if (!form.value.Email || !form.value.Password || !form.value.ConfirmPassword)
          this.errorList.push("Please fill the required form");
        else {
          this.errorList.push("Email is not valid")
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
            window.location.href = "/";
          },
            err => {
              console.log(err);
            });
      }
    }
  }
}
