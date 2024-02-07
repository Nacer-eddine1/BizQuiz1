import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, PatternValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faCancel, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faGooglePlusG } from '@fortawesome/free-brands-svg-icons';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { PatternValidatorsService } from '../shared/services/patternValidators/pattern-validators.service';
import { ConfirmPasswordService } from '../shared/services/confirmPassword/confirm-password.service';
// import {confirmpass}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent implements OnInit {
  form: FormGroup | any;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: '',
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.compose(
            [
              Validators.required,
              PatternValidatorsService.patternValidators(/\d/, {hasNumber:true}),
              PatternValidatorsService.patternValidators(/[A-Z]/, {hasCapitalCase:true}),
              PatternValidatorsService.patternValidators(/[a-z]/, {hasSmallCase:true}),
              PatternValidatorsService.patternValidators(
                /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, {hasSpecialCharacters:true}),
              Validators.minLength(8),
            ]
          )  
        ]
      ],
      confirm_password: [
        '',
        [
          Validators.compose(
            [
              Validators.required,
              PatternValidatorsService.patternValidators(/\d/, {hasNumber:true}),
              PatternValidatorsService.patternValidators(/[A-Z]/, {hasCapitalCase:true}),
              PatternValidatorsService.patternValidators(/[a-z]/, {hasSmallCase:true}),
              PatternValidatorsService.patternValidators(
                /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, {hasSpeacalCharacters:true}),
              Validators.minLength(8),
            ]
          )  
        ]
      ]
    });
  }
  signup(): void {
    this.http
      .post('http://localhost:8000/api/register', this.form.getRawValue())
      .subscribe(() => this.router.navigate(['/login']));
  }

  get username(){
    return this.form.get('username')
  }

  get email(){
    return this.form.get('email')
  }

  get password(){
    return this.form.get('password')
  }

  get confirmpassword(){
    return this.form.get('confirm_password')
  }

  faFacebookF = faFacebookF;
  faLinkedinIn = faLinkedinIn;
  faGooglePlusG = faGooglePlusG;
  faCancel = faCancel;
  faCheckCircle = faCheckCircle;

// service confirm password
  
}

