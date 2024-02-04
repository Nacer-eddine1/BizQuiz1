import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { faClose, faBars } from '@fortawesome/free-solid-svg-icons';
import { Emitters } from '../emitters/emitters';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'], // Fix the typo here
})
export class HeaderComponent implements OnInit {
  menuValue: boolean = false;
  menu_icon: string = 'bi bi-list';
  openMenu() {
    this.menuValue = !this.menuValue;
    this.menu_icon = this.menuValue ? 'bi bi-x' : 'bi bi-list';
  }
  closeMenu() {
    this.menuValue = false;
    this.menu_icon = 'bi bi-list';
  }

  constructor(private router: Router, private http: HttpClient) {}
  authenticated = false;

  ngOnInit(): void {
    this.http
      .get('http://localhost:8000/api/user', { withCredentials: true })
      .subscribe({
        complete: () => {
          Emitters.authEmitter.emit(true);
        },
        error: () => {
          Emitters.authEmitter.emit(false);
          console.log('Not authenticated');
        },
      });
    Emitters.authEmitter.subscribe((auth: boolean) => {
      this.authenticated = auth;
    });
  }

  logout(): void {
    this.http
      .post('http://localhost:8000/api/logout', {}, { withCredentials: true })
      .subscribe(() => (this.authenticated = false));
  }
}
