import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RequestService } from '../../../../core/request/request.service';
import { TestRequest, RequestStatus } from '../../../../core/models/test-request.model';
import { Observable, switchMap, Subject } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PaymentFormComponent } from '../payment-form/payment-form.component';
import { CreatePaymentDto } from '../../../../core/models/payment.model';
import { TestRequestResultComponent } from '../test-request-result/test-request-result.component';
import { TestResultData } from '../test-request-result/test-request-result.model';
import { ViewTestResultComponent } from '../view-test-result/view-test-result.component';

@Component({
    selector: 'app-test-request-details',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatDividerModule,
        MatProgressSpinnerModule,
        MatDialogModule
    ],
    templateUrl: './test-request-details.component.html',
    styleUrls: ['./test-request-details.component.css']
})
export class TestRequestDetailsComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private requestService = inject(RequestService);
    private dialog = inject(MatDialog);

    request$!: Observable<TestRequest>;
    private refreshTrigger$ = new Subject<void>();

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.request$ = this.refreshTrigger$.pipe(
                // startWith(undefined), // trigger initial load - simpler to just merge or just define request$ differently
                switchMap(() => this.requestService.getRequestById(id!)) // using id! because we check if (id)
            );

            // Initial load
            this.request$ = this.requestService.getRequestById(id);
        }
    }

    openPaymentDialog(request: TestRequest) {
        const dialogRef = this.dialog.open(PaymentFormComponent, {
            width: '400px'
        });

        dialogRef.afterClosed().subscribe((result: CreatePaymentDto) => {
            if (result) {
                this.requestService.addPayment(request.id, result.amount, result.mode).subscribe({
                    next: () => {
                        // Reload data
                        this.request$ = this.requestService.getRequestById(request.id);
                    }
                });
            }
        });
    }

    openResultDialog(request: TestRequest) {
        const dialogRef = this.dialog.open(TestRequestResultComponent, {
            width: '500px'
        });

        dialogRef.afterClosed().subscribe((result: TestResultData) => {
            if (result) {
                this.requestService.addResult(request.id, result).subscribe({
                    next: () => {
                        this.requestService.updateStatus(request.id, RequestStatus.COMPLETED).subscribe(() => {
                            this.request$ = this.requestService.getRequestById(request.id);
                        });
                    }
                });
            }
        });
    }

    openViewResultDialog(request: TestRequest) {
        this.dialog.open(ViewTestResultComponent, {
            width: '600px',
            data: { testRequestId: request.id }
        });
    }

    getStatusColor(status: RequestStatus): string {
        switch (status) {
            case RequestStatus.COMPLETED: return 'primary';
            case RequestStatus.IN_PROGRESS: return 'accent';
            case RequestStatus.CANCELLED: return 'warn';
            default: return 'basic'; // PENDING
        }
    }
}
