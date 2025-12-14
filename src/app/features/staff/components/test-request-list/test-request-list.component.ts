import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { RequestService } from '../../../../core/request/request.service';
import { RequestStore } from '../../../../core/request/request-store';
import { TestRequest, RequestStatus } from '../../../../core/models/test-request.model';
import { TestRequestFormComponent } from '../test-request-form/test-request-form.component';

@Component({
    selector: 'app-test-request-list',
    templateUrl: './test-request-list.component.html',
    styleUrl: './test-request-list.component.scss',
    standalone: false
})
export class TestRequestListComponent implements OnInit {
    private requestService = inject(RequestService);
    protected store = inject(RequestStore);
    private dialog = inject(MatDialog);

    displayedColumns: string[] = ['patientName', 'testName', 'price', 'discount', 'outstanding_balance', 'status', 'createdAt', 'actions'];
    dataSource = new MatTableDataSource<TestRequest>([]);

    ngOnInit(): void {
        this.requestService.getRequests().subscribe();
    }

    openRequestDialog(): void {
        this.dialog.open(TestRequestFormComponent, {
            width: '500px'
        });
    }

    updateStatus(id: string, status: string): void {
        this.requestService.updateStatus(id, status).subscribe();
    }
}
