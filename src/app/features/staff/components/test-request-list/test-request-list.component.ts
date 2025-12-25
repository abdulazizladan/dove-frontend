import { Component, inject, OnInit, effect, ViewChild, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { RequestService } from '../../../../core/request/request.service';
import { RequestStore } from '../../../../core/request/request-store';
import { TestRequest, RequestStatus } from '../../../../core/models/test-request.model';
import { TestRequestFormComponent } from '../test-request-form/test-request-form.component';

import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared-module';

@Component({
    selector: 'app-test-request-list',
    templateUrl: './test-request-list.component.html',
    styleUrl: './test-request-list.component.scss',
    standalone: true,
    imports: [CommonModule, SharedModule, RouterModule]
})
export class TestRequestListComponent implements OnInit, AfterViewInit {
    private requestService = inject(RequestService);
    protected store = inject(RequestStore);
    private dialog = inject(MatDialog);

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    displayedColumns: string[] = ['patientName', 'testName', 'price', 'discount', 'outstanding_balance', 'paymentStatus', 'status', 'createdAt', 'actions'];
    dataSource = new MatTableDataSource<TestRequest>([]);
    paymentFilter: 'all' | 'paid' | 'unpaid' = 'all';
    searchFilter: string = '';

    get totalRequests(): number {
        return this.store.requests()?.length || 0;
    }

    get paidRequests(): number {
        return this.store.requests()?.filter(r => (r.outstanding_balance ?? 0) === 0).length || 0;
    }

    get unpaidRequests(): number {
        return this.store.requests()?.filter(r => (r.outstanding_balance ?? 0) > 0).length || 0;
    }

    get paidPercentage(): number {
        return this.totalRequests > 0 ? (this.paidRequests / this.totalRequests) * 100 : 0;
    }

    get unpaidPercentage(): number {
        return this.totalRequests > 0 ? (this.unpaidRequests / this.totalRequests) * 100 : 0;
    }

    constructor() {
        effect(() => {
            const requests = this.store.requests();
            if (requests) {
                this.dataSource.data = requests;
                this.applyFilters();
            }
        });

        // Custom filter predicate to search across nested properties and payment status
        this.dataSource.filterPredicate = (data: TestRequest, filter: string) => {
            const filters = JSON.parse(filter);
            const searchStr = (
                (data.patientName || '') +
                (data.test?.name || '') +
                data.status
            ).toLowerCase();

            const matchesSearch = !filters.search || searchStr.indexOf(filters.search) !== -1;

            let matchesPayment = true;
            if (filters.payment === 'paid') {
                matchesPayment = (data.outstanding_balance ?? 0) === 0;
            } else if (filters.payment === 'unpaid') {
                matchesPayment = (data.outstanding_balance ?? 0) > 0;
            }

            return matchesSearch && matchesPayment;
        };
    }

    ngOnInit(): void {
        this.requestService.getRequests().subscribe();
    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
    }

    applyFilter(event: Event) {
        this.searchFilter = (event.target as HTMLInputElement).value.trim().toLowerCase();
        this.applyFilters();
    }

    onPaymentFilterChange(value: 'all' | 'paid' | 'unpaid') {
        this.paymentFilter = value;
        this.applyFilters();
    }

    private applyFilters() {
        this.dataSource.filter = JSON.stringify({
            search: this.searchFilter,
            payment: this.paymentFilter
        });
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
