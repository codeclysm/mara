import { Component } from '@angular/core';
@Component({
  selector: 'mara-app',
  template: `
  <mara-header></mara-header>
  <div class="container"><router-outlet></router-outlet></div>
  `
})
export class AppComponent { }
