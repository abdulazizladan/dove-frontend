import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivityLog } from '../models/activity-log.model';

@Injectable({
    providedIn: 'root'
})
export class ActivityLogService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:3000/api/logs';

    getLogs(): Observable<ActivityLog[]> {
        return this.http.get<ActivityLog[]>(this.apiUrl);
    }
}
