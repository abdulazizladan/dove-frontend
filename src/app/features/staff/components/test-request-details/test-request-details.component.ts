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
import { Observable } from 'rxjs';

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
        MatProgressSpinnerModule
    ],
    templateUrl: './test-request-details.component.html'
})
export class TestRequestDetailsComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private requestService = inject(RequestService);
    request$!: Observable<TestRequest>;

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.request$ = this.requestService.getRequestById(id);
        }
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
