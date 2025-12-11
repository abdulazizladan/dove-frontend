import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '../auth/auth-store';

export const authGuard: CanActivateFn = (route, state) => {
    const store = inject(AuthStore);
    const router = inject(Router);

    if (store.isAuthenticated()) {
        return true;
    }

    // Optional: Check local storage if store is empty (handled in AuthService init usually)
    // For now, redirect to login
    return router.createUrlTree(['/auth/login']);
};
