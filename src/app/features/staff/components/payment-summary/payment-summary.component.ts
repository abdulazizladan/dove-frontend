import { Component, Input, OnChanges, OnInit, inject } from '@angular/core';
import { TestRequest } from '../../../../core/models/test-request.model';
import { PaymentService, PaymentListItem } from '../../../../core/payment/payment.service';

@Component({
    selector: 'app-payment-summary',
    standalone: false,
    templateUrl: './payment-summary.component.html',
    styleUrls: ['./payment-summary.component.css']
})
export class PaymentSummaryComponent implements OnInit, OnChanges {
    @Input() requests: TestRequest[] = [];
    private paymentService = inject(PaymentService);

    totalInputToday = 0;
    totalInputYesterday = 0;
    outstandingPayment = 0;

    // Chart props
    chartPoints: string = '';
    chartWidth = 800; // viewBox width
    chartHeight = 100; // viewBox height
    dataPoints: number[] = [];

    // Store fetched payments to avoid refetching if not needed, or just process them
    private payments: PaymentListItem[] = [];

    ngOnInit() {
        this.loadPayments();
    }

    ngOnChanges() {
        this.calculateOutstanding();
    }

    private loadPayments() {
        this.paymentService.getPayments().subscribe({
            next: (data) => {
                this.payments = data;
                this.calculateRevenueStats();
                this.generateChartData();
            },
            error: (err) => console.error('Failed to load payments', err)
        });
    }

    private calculateOutstanding() {
        this.outstandingPayment = 0;
        if (this.requests) {
            this.requests.forEach(req => {
                this.outstandingPayment += (req.outstanding_balance || 0);
            });
        }
    }

    private calculateRevenueStats() {
        const now = new Date();
        const today = now.toDateString();

        const yesterdayDate = new Date(now);
        yesterdayDate.setDate(now.getDate() - 1);
        const yesterday = yesterdayDate.toDateString();

        this.totalInputToday = 0;
        this.totalInputYesterday = 0;

        this.payments.forEach(p => {
            // PaymentListItem has payment_date or created_at? 
            // In PaymentService interface it says 'payment_date'.
            // But in previous calculateStats code we used 'created_at'.
            // Let's check PaymentListItem interface in payment.service.ts
            // It has 'payment_date'.
            const pDate = p.payment_date ? new Date(p.payment_date) : new Date();
            const dateStr = pDate.toDateString();

            if (dateStr === today) {
                this.totalInputToday += Number(p.amount);
            } else if (dateStr === yesterday) {
                this.totalInputYesterday += Number(p.amount);
            }
        });
    }

    private generateChartData() {
        // Generate map of last 30 days
        const daysMap = new Map<string, number>();
        const today = new Date();

        // Initialize last 30 days with 0
        for (let i = 29; i >= 0; i--) {
            const d = new Date();
            d.setDate(today.getDate() - i);
            daysMap.set(d.toDateString(), 0);
        }

        // Populate actual data
        this.payments.forEach(p => {
            const pDate = p.payment_date ? new Date(p.payment_date) : new Date();
            const dateStr = pDate.toDateString();
            if (daysMap.has(dateStr)) {
                daysMap.set(dateStr, daysMap.get(dateStr)! + Number(p.amount));
            }
        });

        this.dataPoints = Array.from(daysMap.values());

        // Scale points to SVG chart
        // If maxVal is 0, chart will be flat line at bottom
        let maxVal = Math.max(...this.dataPoints);
        if (maxVal === 0) maxVal = 100; // prevent divide by zero

        const stepX = this.chartWidth / (this.dataPoints.length - 1);

        // Generate Path: M x y L x y ...
        this.chartPoints = this.dataPoints.map((val, index) => {
            const x = index * stepX;
            // Invert Y because SVG connects from top-left. 0 value should be at chartHeight.
            // val/maxVal gives 0-1. 1 should be at y=0. 0 should be at y=chartHeight.
            const y = this.chartHeight - ((val / maxVal) * this.chartHeight);

            // Limit Y to avoid drawing out of bounds (padding)
            // Use 5px padding
            const paddedY = Math.min(Math.max(y, 5), this.chartHeight - 5);

            return `${index === 0 ? 'M' : 'L'} ${x} ${paddedY}`;
        }).join(' ');
    }
}  
