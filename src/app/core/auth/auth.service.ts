import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, throwError, of } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
import { AuthStore } from './auth-store';
import { User, UserRole } from '../models/user.model';
import { jwtDecode } from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private http = inject(HttpClient);
    private storage = inject(LocalStorageService);
    private store = inject(AuthStore);
    private router = inject(Router);

    private apiUrl = 'http://localhost:3000'; // Assumption: NestJS runs on port 3000

    login(credentials: { email: string; password: string }): Observable<any> {
        this.store.setLoading(true);
        return this.http.post<{ user: User; accessToken: string }>(`${this.apiUrl}/auth/login`, credentials).pipe(
            tap(response => {
                this.storage.store('authenticationToken', response.accessToken);
                this.store.loginSuccess(response.user, response.accessToken);

                const decodedToken: any = jwtDecode(response.accessToken);
                const role = decodedToken.role;

                if (role === UserRole.ADMIN) {
                    this.router.navigate(['/admin']);
                } else if (role === UserRole.STAFF) {
                    this.router.navigate(['/staff']);
                } else {
                    this.router.navigate(['/']);
                }
            }),
            catchError(error => {
                this.store.loginFailure(error.message || 'Login failed');
                return throwError(() => error);
            })
        );
    }

    logout(): void {
        this.storage.clear('authenticationToken');
        this.store.logout();
        this.router.navigate(['/auth/login']);
    }

    getToken(): string | null {
        return this.storage.retrieve('authenticationToken');
    }

    // Method to check stored token on app start
    initAuth(): void {
        const token = this.getToken();
        // Implementation details: In a real app we'd decode token or fetch profile
        // For now, if token exists, we set authenticated (but we lack user info without a profile fetch)
        // We should probably implement getProfile() if needed, but F-201 doesn't explicitly ask for it other than "API communication".
        if (token) {
            // Optimistically set authenticated, or ideally fetch user me
            // this.store.loginSuccess(null!, token); // Requires User object.
            // Let's assume we need to fetch user profile.
        }
    }
}
