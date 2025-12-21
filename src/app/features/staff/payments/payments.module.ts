import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { BaseChartDirective } from 'ng2-charts';

import { PaymentsRoutingModule } from './payments-routing.module';
import { PaymentsListComponent } from './components/payments-list/payments-list.component';
import { SharedModule } from '../../../shared/shared-module';

import { PaymentDetailsComponent } from './components/payment-details/payment-details.component';

import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
    declarations: [
        PaymentsListComponent,
        PaymentDetailsComponent
    ],
    imports: [
        CommonModule,
        PaymentsRoutingModule,
        SharedModule,
        BaseChartDirective,
        MatDividerModule,
        MatProgressSpinnerModule
    ],
    providers: [
        provideCharts(withDefaultRegisterables())
    ]
})
export class PaymentsModule { }
