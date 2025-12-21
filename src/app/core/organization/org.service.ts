import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Organization, Department } from '../models/organization.model';
import { environment } from '../../../environments/environment';
import { OrgStore } from './org-store';

@Injectable({
    providedIn: 'root'
})
export class OrganizationService {
    private http = inject(HttpClient);
    private store = inject(OrgStore);
    private apiUrl = `${environment.baseUrl}/organization`;

    createOrganization(org: Organization): Observable<Organization> {
        return this.http.post<Organization>(this.apiUrl, org).pipe(
            tap((updatedOrg) => this.store.setOrganization(updatedOrg))
        );
    }

    getOrganization(): Observable<Organization[]> {
        this.store.setLoading(true);
        return this.http.get<Organization[]>(this.apiUrl).pipe(
            tap({
                next: (orgs) => {
                    if (orgs && orgs.length > 0) {
                        this.store.setOrganization(orgs[0]);
                    }
                },
                error: (err) => this.store.setError(err.message)
            })
        );
    }

    updateOrganization(org: Partial<Organization>): Observable<Organization> {
        return this.http.patch<Organization>(this.apiUrl, org).pipe(
            tap((updatedOrg) => this.store.setOrganization(updatedOrg))
        );
    }

    getDepartments(): Observable<Department[]> {
        return this.http.get<Department[]>(`${environment.baseUrl}/departments`);
    }

    addDepartment(department: { name: string; organizationId: string }): Observable<Department> {
        return this.http.post<Department>(`${environment.baseUrl}/departments`, department);
    }
}
