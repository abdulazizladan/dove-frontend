import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { TestRequest } from '../models/test-request.model';
import { RequestStore } from './request-store';

@Injectable({
    providedIn: 'root'
})
export class RequestService {
    private http = inject(HttpClient);
    private store = inject(RequestStore);
    private apiUrl = 'http://localhost:3000/api/requests';

    getRequests(): Observable<TestRequest[]> {
        this.store.setLoading(true);
        return this.http.get<TestRequest[]>(this.apiUrl).pipe(
            tap({
                next: (requests) => this.store.setRequests(requests),
                error: (err) => this.store.setError(err.message)
            })
        );
    }

    createRequest(request: Partial<TestRequest>): Observable<TestRequest> {
        this.store.setLoading(true);
        return this.http.post<TestRequest>(this.apiUrl, request).pipe(
            tap({
                next: (newRequest) => this.store.addRequest(newRequest),
                error: (err) => this.store.setError(err.message)
            })
        );
    }

    updateStatus(id: string, status: string): Observable<TestRequest> {
        this.store.setLoading(true);
        return this.http.patch<TestRequest>(`${this.apiUrl}/${id}/status`, { status }).pipe(
            tap({
                next: (updated) => this.store.updateRequest(updated),
                error: (err) => this.store.setError(err.message)
            })
        );
    }
}
