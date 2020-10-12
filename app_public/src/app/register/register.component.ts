import { Component, OnInit } from '@angular/core';
//import {NgForm} from '@angular/forms';
import { FormGroup } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { HistoryService } from '../history.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.pug',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

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

  public onRegisterSubmit(): void {

    this.formError = '';

    if (!this.credentials.name || !this.credentials.email || !this.credentials.password) {
      this.formError = 'All fields are required, please try again';
    } else {
      this.doRegister();
    }

  }

  private doRegister(): void {
    this.authenticationService.register(this.credentials)
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
