import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PaymentService, PaymentListItem } from '../../../../../core/payment/payment.service';
import { Observable, switchMap } from 'rxjs';

@Component({
    selector: 'app-payment-details',
    standalone: false, // Keeping it part of PaymentsModule as requested implied structure
    // Actually, making it standalone:false means we must declare it. 
    // The previous components were standalone:false (PaymentsListComponent).
    templateUrl: './payment-details.component.html',
    styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private paymentService = inject(PaymentService);

    payment$!: Observable<PaymentListItem>;

    ngOnInit() {
        this.payment$ = this.route.paramMap.pipe(
            switchMap(params => {
                const id = params.get('id');
                return this.paymentService.getPaymentById(id!);
            })
        );
    }
}
