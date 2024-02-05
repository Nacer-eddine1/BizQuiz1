import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faGooglePlusG } from '@fortawesome/free-brands-svg-icons';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

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
      email: '',
      password: '',
    });
  }
  signup(): void {
    this.http
      .post('http://localhost:8000/api/register', this.form.getRawValue())
      .subscribe(() => this.router.navigate(['/login']));
  }
  faFacebookF = faFacebookF;
  faLinkedinIn = faLinkedinIn;
  faGooglePlusG = faGooglePlusG;
}
