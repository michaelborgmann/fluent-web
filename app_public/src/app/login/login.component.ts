import { Component, OnInit } from '@angular/core';
//import {NgForm} from '@angular/forms';
import { FormGroup } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { HistoryService } from '../history.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.pug',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formError: string = '';

  public credentials = {
    name: '',
    email: '',
    password: ''
  };


    constructor(
      private router: Router,
      private authenticationService: AuthenticationService,
      private historyService: HistoryService
    ) { }

  public onLoginSubmit(): void {

    this.formError = '';

    if (!this.credentials.email || !this.credentials.password) {
      this.formError = 'All fields are required, please try again';
    } else {
      this.doLogin();
    }

  }

  private doLogin(): void {
    this.authenticationService.login(this.credentials)
    .then( () => {
      this.router.navigateByUrl(this.historyService.getPreviousUrl());
    })
    .catch( (message) => {
      this.formError = message;
    });
  }

  ngOnInit(): void {
  }

}
