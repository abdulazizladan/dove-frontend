import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReceptionistLayout } from '../../layout/receptionist-layout/receptionist-layout.component';
import { PatientListComponent } from '../staff/components/patient-list/patient-list.component';
import { TestRequestListComponent } from '../staff/components/test-request-list/test-request-list.component';
import { TestRequestDetailsComponent } from '../staff/components/test-request-details/test-request-details.component';
import { ReceptionistDashboardComponent } from './components/receptionist-dashboard/receptionist-dashboard.component';
import { roleGuard } from '../../core/guards/role.guard';
import { UserRole } from '../../core/models/user.model';

const routes: Routes = [
    {
        path: '',
        component: ReceptionistLayout,
        canActivate: [roleGuard],
        data: { role: UserRole.RECEPTIONIST },
        children: [
            { path: 'dashboard', component: ReceptionistDashboardComponent },
            { path: 'patients', component: PatientListComponent },
            { path: 'requests', component: TestRequestListComponent },
            { path: 'request-details/:id', component: TestRequestDetailsComponent },
            { path: 'payments', loadChildren: () => import('../staff/payments/payments.module').then(m => m.PaymentsModule) },
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReceptionistRoutingModule { }

