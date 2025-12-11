import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { User } from '../models/user.model';
import { inject } from '@angular/core';

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null
};

export const AuthStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store) => ({
        loginSuccess(user: User, token: string) {
            patchState(store, {
                user,
                token,
                isAuthenticated: true,
                isLoading: false,
                error: null
            });
        },
        loginFailure(error: string) {
            patchState(store, {
                isLoading: false,
                error,
                isAuthenticated: false,
                user: null,
                token: null
            });
        },
        logout() {
            patchState(store, initialState);
        },
        setLoading(isLoading: boolean) {
            patchState(store, { isLoading });
        }
    }))
);
