import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Test } from '../models/test.model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TestService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.baseUrl}/tests`;

    getTests(): Observable<Test[]> {
        return this.http.get<Test[]>(this.apiUrl);
    }

    createTest(test: Test): Observable<Test> {
        return this.http.post<Test>(this.apiUrl, test);
    }
}
