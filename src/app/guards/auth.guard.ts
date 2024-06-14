import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const authGuard: CanActivateFn = (route, state) => {
  const cookies = inject(CookieService);
  const router = inject(Router);

  if (cookies.get('token') !== '') {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
