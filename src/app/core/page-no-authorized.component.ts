import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-no-authorized',
  template: `
    <div class="container">
      <h1 class="text-center">Acesso não autorizado!</h1>
    </div>
  `,
  styles: []
})
export class PageNoAuthorized implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
