import { Component } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'hello',
  template: `
    <h2>
      Hello {{ name }}!
    </h2>
  `
})

export class HelloComponent {
  name = 'World';
}
