import { Component } from '@angular/core';
@Component({
  selector: 'mara-app',
  template: `
  <mara-header></mara-header>
  <router-outlet></router-outlet>
  `
})
export class AppComponent { }
