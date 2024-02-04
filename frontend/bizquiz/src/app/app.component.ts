import { Component } from '@angular/core';
import { NgbAccordionBody } from '@ng-bootstrap/ng-bootstrap';
import { NgbAccordionButton } from '@ng-bootstrap/ng-bootstrap';
import { NgbAccordionCollapse } from '@ng-bootstrap/ng-bootstrap';
import { NgbAccordionHeader } from '@ng-bootstrap/ng-bootstrap';
import { NgbAccordionItem } from '@ng-bootstrap/ng-bootstrap';
import { faClipboardQuestion } from '@fortawesome/free-solid-svg-icons';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  faClipboardQuestion = faClipboardQuestion;
  ngbAccordionItem = NgbAccordionItem;
  ngbAccordionHeader = NgbAccordionHeader;
  ngbAccordionButton = NgbAccordionButton;
  ngbAccordionCollapse = NgbAccordionCollapse;
  ngbAccordionBody = NgbAccordionBody;
  isLoginPage: boolean = false;
  isSignupPage: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = event.url === '/login';
      }
    });
    this.router.events.subscribe((event_2) => {
      if (event_2 instanceof NavigationEnd) {
        this.isSignupPage = event_2.url === '/signup';
      }
    });
  }
}
