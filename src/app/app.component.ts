import { Component } from '@angular/core';
import { ToastyConfig } from 'ng2-toasty';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})

export class AppComponent {

  constructor(
    private router: Router,  // Import the Router from Angular Router module to handle navigation.
    private toastyConfig: ToastyConfig
  ) {
    this.toastyConfig.theme = 'bootstrap';
  }


  displayNavbar() {
    return this.router.url !== '/login';
  }

}
