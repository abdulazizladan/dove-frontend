import { Component, inject, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { RequestService } from '../../../../core/request/request.service';
import { TestResult } from '../test-request-result/test-request-result.model';

@Component({
    selector: 'app-view-test-result',
    standalone: true,
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatCardModule
    ],
    templateUrl: './view-test-result.component.html',
    styleUrls: ['./view-test-result.component.css']
})
export class ViewTestResultComponent implements OnInit {
    private dialogRef = inject(MatDialogRef<ViewTestResultComponent>);
    private requestService = inject(RequestService);

    testResult?: TestResult;
    isLoading = true;
    error?: string;

    constructor(@Inject(MAT_DIALOG_DATA) public data: { testRequestId: string }) { }

    ngOnInit() {
        if (this.data?.testRequestId) {
            this.requestService.getRequestById(this.data.testRequestId).subscribe({
                next: (testRequest) => {
                    this.testResult = testRequest.result;
                    this.isLoading = false;
                },
                error: (err) => {
                    this.error = err.message || 'Failed to load test result';
                    this.isLoading = false;
                }
            });
        } else {
            this.error = 'No test request ID provided';
            this.isLoading = false;
        }
    }

    get uploaderName(): string {
        if (this.testResult?.uploadedBy) {
            const { first_name, last_name } = this.testResult.uploadedBy;
            return `${first_name} ${last_name}`.trim();
        }
        return 'Unknown';
    }

    onClose() {
        this.dialogRef.close();
    }
}
