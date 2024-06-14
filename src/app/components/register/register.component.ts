import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UserToRegister } from '../../interfaces/UserToRegister';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private http: HttpClient, private cookieService: CookieService) { }

  user: any = {};
  showErrorAlert = false; // Variable para controlar si se muestra la alerta de error

  submit() {
    console.log(this.user);

    this.http.post<any>(`http://localhost:8080/user/register`, this.user)
      .subscribe(
        (response) => {
          console.log("Registro exitoso:", response);
          this.cookieService.set('token', response.token, { expires: 7 });
          window.location.href = "/";
        },
        (error) => {
          console.error("Error en el registro:", error);
          this.showErrorAlert = true;
        }
      );
  }
}
