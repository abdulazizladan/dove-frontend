import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentsListComponent } from './components/payments-list/payments-list.component';
import { PaymentDetailsComponent } from './components/payment-details/payment-details.component';

const routes: Routes = [
    { path: '', component: PaymentsListComponent },
    { path: 'details/:id', component: PaymentDetailsComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PaymentsRoutingModule { }
