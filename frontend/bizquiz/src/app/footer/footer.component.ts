import { Component } from '@angular/core';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faGooglePlusG } from '@fortawesome/free-brands-svg-icons';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faInstagramSquare } from '@fortawesome/free-brands-svg-icons';
import { faSquareInstagram } from '@fortawesome/free-brands-svg-icons';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  faFacebookF = faFacebookF
  faLinkedinIn = faLinkedinIn
  faGooglePlusG = faGooglePlusG
  faInstagram = faInstagram
  faInstagramSquare = faInstagramSquare
  faSquareInstagram = faSquareInstagram
}
