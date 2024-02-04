import { Component } from '@angular/core';
import { faClipboardQuestion } from '@fortawesome/free-solid-svg-icons';
import {
  NgbAccordionBody,
  NgbAccordionButton,
  NgbAccordionCollapse,
  NgbAccordionHeader,
  NgbAccordionItem,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  faClipboardQuestion = faClipboardQuestion;
  ngbAccordionItem = NgbAccordionItem;
  ngbAccordionHeader = NgbAccordionHeader;
  ngbAccordionButton = NgbAccordionButton;
  ngbAccordionCollapse = NgbAccordionCollapse;
  ngbAccordionBody = NgbAccordionBody;
  constructor() {}

  data_card = [
    { id: 1, name: 'Card 1' },
    { id: 2, name: 'Card 2' },
    { id: 3, name: 'Card 3' },
    { id: 4, name: 'Card 4' },
  ];

  menuVariable: boolean = false;
  openMenu() {
    this.menuVariable = true;
  }
  closeMenu() {
    this.menuVariable = false;
  }
}
