import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-receptionist-dashboard',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatIconModule,
        RouterModule
    ],
    templateUrl: './receptionist-dashboard.component.html',
    styleUrl: './receptionist-dashboard.component.scss'
})
export class ReceptionistDashboardComponent {
    quickLinks = [
        {
            title: 'Patient Management',
            description: 'Register and manage patient records',
            icon: 'people',
            route: '/receptionist/patients'
        },
        {
            title: 'Test Requests',
            description: 'View and manage test requests',
            icon: 'assignment',
            route: '/receptionist/requests'
        },
        {
            title: 'Payments',
            description: 'Process and track payments',
            icon: 'payments',
            route: '/receptionist/payments'
        }
    ];
}
