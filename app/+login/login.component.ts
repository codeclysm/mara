import { Component } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'mara-login',
  templateUrl: 'app/+login/login.component.html',
  styles: [``]
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    this.auth.login(this.username, this.password)
      .subscribe(() => {
        this.router.navigate(['calendar']);
      }, () => {
        this.error = 'Il nome utente oppure la password sono sbagliati';
      });
  }

}
