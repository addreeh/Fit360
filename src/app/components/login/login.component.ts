import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: any = {};
  showErrorAlert: boolean = false;

  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) { }

  submit() {
    this.http.post<any>('http://localhost:8080/user/login', this.user)
      .subscribe(
        (response) => {
          console.log('Registro exitoso:', response);
          this.cookieService.set('token', response.token, { expires: 7 });
          window.location.href = "/";

        },
        (error) => {
          console.error('Error en el registro:', error);
          // Mostrar la alerta de error
          this.showErrorAlert = true;
        }
      );
  }
}
