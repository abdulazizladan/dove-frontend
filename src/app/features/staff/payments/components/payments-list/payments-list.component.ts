
import { Component, inject, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PaymentService, PaymentGraphItem, PaymentListItem } from '../../../../../core/payment/payment.service';
import { firstValueFrom, forkJoin } from 'rxjs';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
    selector: 'app-payments-list',
    templateUrl: './payments-list.component.html',
    styleUrls: ['./payments-list.component.css'],
    standalone: false
})
export class PaymentsListComponent implements OnInit, AfterViewInit {
    private paymentService = inject(PaymentService);

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    dataSource = new MatTableDataSource<PaymentListItem>([]);
    displayedColumns: string[] = ['date', 'patient', 'test', 'amount', 'mode', 'status'];

    totalRevenue30Days = 0;

    // Chart Properties
    public lineChartData: ChartConfiguration['data'] = {
        datasets: [
            {
                data: [],
                label: 'Revenue',
                backgroundColor: 'rgba(59, 130, 246, 0.2)', // blue-500/20
                borderColor: '#3b82f6',
                pointBackgroundColor: '#3b82f6',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#3b82f6',
                fill: 'origin',
            }
        ],
        labels: []
    };

    public lineChartOptions: ChartConfiguration['options'] = {
        elements: {
            line: {
                tension: 0.4
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(0, 0, 0, 0.05)'
                }
            }
        },
        plugins: {
            legend: {
                display: false
            }
        },
        maintainAspectRatio: false,
        responsive: true
    };

    public lineChartType: ChartType = 'line';


    ngOnInit() {
        this.loadData();
    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
    }

    async loadData() {
        try {
            const [graphData, payments] = await firstValueFrom(
                forkJoin([
                    this.paymentService.getPaymentGraph(),
                    this.paymentService.getPayments()
                ])
            );

            // Process Table Data
            this.dataSource.data = payments;

            // Process Chart Data
            const labels = graphData.map(d => new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
            const data = graphData.map(d => d.total);

            this.lineChartData = {
                datasets: [{
                    ...this.lineChartData.datasets[0],
                    data: data
                }],
                labels: labels
            };

            // Calculate Total
            this.totalRevenue30Days = data.reduce((a, b) => a + Number(b), 0);

        } catch (error) {
            console.error('Error loading payment data', error);
        }
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
}

