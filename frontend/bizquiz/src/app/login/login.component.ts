import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {
  faFacebookF,
  faGooglePlusG,
  faLinkedinIn} from '@fortawesome/free-brands-svg-icons';
import { CookieService } from 'ngx-cookie-service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup | any;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: '',
      password: '',
    });
  }
  login(): void {
    this.http
      .post('http://localhost:8000/api/login', this.form.getRawValue(), {
        withCredentials: true,
      })
      .subscribe(() =>
        this.router.navigate(['']).then(() => {
          reloadPage();
        })
      );
  }

  faFacebookF = faFacebookF;
  faLinkedinIn = faLinkedinIn;
  faGooglePlusG = faGooglePlusG;
}
function reloadPage() {
  window.location.reload();
}
