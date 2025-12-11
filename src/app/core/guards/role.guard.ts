import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '../auth/auth-store';
import { UserRole } from '../models/user.model';

export const roleGuard: CanActivateFn = (route, state) => {
    const store = inject(AuthStore);
    const router = inject(Router);
    const requiredRole = route.data['role'] as UserRole;

    if (store.isAuthenticated() && store.user()?.role === requiredRole) {
        return true;
    }

    // Redirect to forbidden or login
    return router.createUrlTree(['/auth/login']); // Or a 403 page
};
