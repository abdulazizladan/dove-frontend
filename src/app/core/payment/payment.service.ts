import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface PaymentGraphItem {
    date: string;
    total: number;
}

export interface PaymentListItem {
    id: string;
    payment_date: string;
    amount: number;
    mode: string;
    patient_name: string;
    test_name: string;
    outstanding_balance: number;
}

@Injectable({
    providedIn: 'root'
})
export class PaymentService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.baseUrl}/payments`;

    getPaymentGraph(): Observable<PaymentGraphItem[]> {
        return this.http.get<PaymentGraphItem[]>(`${this.apiUrl}/graph`);
    }

    getPayments(): Observable<PaymentListItem[]> {
        return this.http.get<PaymentListItem[]>(this.apiUrl);
    }

    getPaymentById(id: string): Observable<PaymentListItem> {
        return this.http.get<PaymentListItem>(`${this.apiUrl}/${id}`);
    }
}
