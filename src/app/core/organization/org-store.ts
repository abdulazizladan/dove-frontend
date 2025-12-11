import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Organization } from '../models/organization.model';
import { inject } from '@angular/core';

export interface OrgState {
    organization: Organization | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: OrgState = {
    organization: null,
    isLoading: false,
    error: null
};

export const OrgStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store) => ({
        setOrganization(organization: Organization) {
            patchState(store, { organization, isLoading: false, error: null });
        },
        setLoading(isLoading: boolean) {
            patchState(store, { isLoading });
        },
        setError(error: string) {
            patchState(store, { error, isLoading: false });
        }
    }))
);
