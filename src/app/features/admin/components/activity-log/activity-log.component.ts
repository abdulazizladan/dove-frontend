import { Component, inject, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ActivityLogService } from '../../../../core/logging/activity-log.service';
import { ActivityLog } from '../../../../core/models/activity-log.model';

@Component({
    selector: 'app-activity-log',
    templateUrl: './activity-log.component.html',
    styleUrl: './activity-log.component.scss',
    standalone: false
})
export class ActivityLogComponent implements OnInit, AfterViewInit {
    private logService = inject(ActivityLogService);

    displayedColumns: string[] = ['timestamp', 'user', 'action', 'details'];
    dataSource = new MatTableDataSource<ActivityLog>([]);

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    ngOnInit(): void {
        this.logService.getLogs().subscribe(logs => {
            this.dataSource.data = logs;
        });
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
}
