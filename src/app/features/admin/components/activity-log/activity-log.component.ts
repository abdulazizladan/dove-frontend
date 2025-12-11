import { Component, inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivityLogService } from '../../../../core/logging/activity-log.service';
import { ActivityLog } from '../../../../core/models/activity-log.model';

@Component({
    selector: 'app-activity-log',
    templateUrl: './activity-log.component.html',
    styleUrl: './activity-log.component.scss',
    standalone: false
})
export class ActivityLogComponent implements OnInit {
    private logService = inject(ActivityLogService);

    displayedColumns: string[] = ['timestamp', 'user', 'action', 'details'];
    dataSource = new MatTableDataSource<ActivityLog>([]);

    ngOnInit(): void {
        this.logService.getLogs().subscribe(logs => {
            this.dataSource.data = logs;
        });
    }
}
