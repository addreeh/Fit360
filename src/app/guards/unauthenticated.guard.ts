import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const unauthenticatedGuard: CanActivateFn = (route, state) => {
  const cookies = inject(CookieService);

  if (cookies.get('token') === '') {
    return true;
  } else {
    window.location.href = "/login";
    return false;
  }
};
