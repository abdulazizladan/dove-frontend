import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Patient } from '../models/patient.model';
import { environment } from '../../../environments/environment';
import { PatientStore } from './patient-store';

@Injectable({
    providedIn: 'root'
})
export class PatientService {
    private http = inject(HttpClient);
    private store = inject(PatientStore);
    private apiUrl = `${environment.baseUrl}/patients`;

    getPatients(): Observable<Patient[]> {
        this.store.setLoading(true);
        return this.http.get<Patient[]>(this.apiUrl).pipe(
            tap({
                next: (patients) => this.store.setPatients(patients),
                error: (err) => this.store.setError(err.message)
            })
        );
    }

    createPatient(patient: Partial<Patient>): Observable<Patient> {
        this.store.setLoading(true);
        return this.http.post<Patient>(this.apiUrl, patient).pipe(
            tap({
                next: (newPatient) => this.store.addPatient(newPatient),
                error: (err) => this.store.setError(err.message)
            })
        );
    }

    updatePatient(id: string, patient: Partial<Patient>): Observable<Patient> {
        this.store.setLoading(true);
        return this.http.patch<Patient>(`${this.apiUrl}/${id}`, patient).pipe(
            tap({
                next: (updated) => this.store.updatePatient(updated),
                error: (err) => this.store.setError(err.message)
            })
        );
    }

    deletePatient(id: string): Observable<void> {
        this.store.setLoading(true);
        return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
            tap({
                next: () => this.store.deletePatient(id),
                error: (err) => this.store.setError(err.message)
            })
        );
    }
}
