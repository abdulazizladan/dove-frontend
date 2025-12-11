import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Organization } from '../models/organization.model';
import { OrgStore } from './org-store';

@Injectable({
    providedIn: 'root'
})
export class OrganizationService {
    private http = inject(HttpClient);
    private store = inject(OrgStore);
    private apiUrl = 'http://localhost:3000/api/organization';

    getOrganization(): Observable<Organization> {
        this.store.setLoading(true);
        return this.http.get<Organization>(this.apiUrl).pipe(
            tap({
                next: (org) => this.store.setOrganization(org),
                error: (err) => this.store.setError(err.message)
            })
        );
    }

    updateOrganization(org: Partial<Organization>): Observable<Organization> {
        return this.http.patch<Organization>(this.apiUrl, org).pipe(
            tap((updatedOrg) => this.store.setOrganization(updatedOrg))
        );
    }
}
