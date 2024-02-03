import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
class PermissionsService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  public canActivate(router: Router): boolean {
    if (!isPlatformBrowser(this.platformId)) return false;

    const token = localStorage.getItem('token');
    return token ? true : (router.navigateByUrl('/login'), false);
  }
}

export const authGuard: CanActivateFn = (route, state) => {
  return inject(PermissionsService).canActivate(inject(Router));
};
