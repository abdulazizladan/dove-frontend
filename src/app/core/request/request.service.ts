import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { TestRequest } from '../models/test-request.model';
import { environment } from '../../../environments/environment';
import { RequestStore } from './request-store';

@Injectable({
    providedIn: 'root'
})
export class RequestService {
    private http = inject(HttpClient);
    private store = inject(RequestStore);
    private apiUrl = `${environment.baseUrl}/test-requests`;

    getRequests(): Observable<TestRequest[]> {
        this.store.setLoading(true);
        return this.http.get<TestRequest[]>(this.apiUrl).pipe(
            tap({
                next: (requests) => this.store.setRequests(requests),
                error: (err) => this.store.setError(err.message)
            })
        );
    }

    getRequestById(id: string): Observable<TestRequest> {
        return this.http.get<TestRequest>(`${this.apiUrl}/${id}`);
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

    addPayment(id: string, amount: number, mode: string): Observable<any> {
        this.store.setLoading(true);
        return this.http.post<any>(`${this.apiUrl}/${id}/payment`, { amount, mode }).pipe(
            tap({
                next: () => {
                    // Ideally we should update the store here, but for now getting the request again in the component works
                    this.store.setLoading(false);
                },
                error: (err) => this.store.setError(err.message)
            })
        );
    }

    addResult(id: string, result: { summary: string, attachmentUrl?: string }): Observable<any> {
        this.store.setLoading(true);
        return this.http.post<any>(`${this.apiUrl}/${id}/result`, result).pipe(
            tap({
                next: () => this.store.setLoading(false),
                error: (err) => this.store.setError(err.message)
            })
        );
    }
}
