import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivityLog } from '../models/activity-log.model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ActivityLogService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.baseUrl}/activity-log`;

    getLogs(): Observable<ActivityLog[]> {
        return this.http.get<ActivityLog[]>(this.apiUrl);
    }
}
