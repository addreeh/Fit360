import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private cookieService: CookieService) { }

  getToken(): string | undefined {
    return this.cookieService.get('token');
  }

  isAuthenticated(): boolean {
    // Verificar si el token existe en la cookie
    return !!this.getToken();
  }

  logout(): void {
    // Eliminar la cookie del token al cerrar sesión
    this.cookieService.delete('token');
    window.location.href = "/"
  }
}
