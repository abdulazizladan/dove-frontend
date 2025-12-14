import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReferringDoctor } from '../models/referring-doctor.model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ReferringDoctorService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.baseUrl}/referring-doctors`;

    getDoctors(): Observable<ReferringDoctor[]> {
        return this.http.get<ReferringDoctor[]>(this.apiUrl);
    }

    getDoctorById(id: string): Observable<ReferringDoctor> {
        return this.http.get<ReferringDoctor>(`${this.apiUrl}/${id}`);
    }

    createDoctor(doctor: Partial<ReferringDoctor>): Observable<ReferringDoctor> {
        return this.http.post<ReferringDoctor>(this.apiUrl, doctor);
    }

    getHospitals(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/hospitals`);
    }

    createHospital(hospital: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/hospitals`, hospital);
    }
}
