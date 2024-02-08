import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  faFacebookF,
  faGooglePlusG,
  faLinkedinIn} from '@fortawesome/free-brands-svg-icons';
import { CookieService } from 'ngx-cookie-service';
import { finalize } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  redirectUrl: any='';
  form: FormGroup | any;

  

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private auth: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.redirectUrl= this.activatedRoute.snapshot.queryParamMap.get('redirectUrl') || '/';
    this.form = this.formBuilder.group({
      email: '',
      password: '',
    });
  }
  login(): void {
    this.auth.login().then(()=>{
      this.router.navigate(['/']);
      // this.router.navigateByUrl(this.redirectUrl);
    });
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
