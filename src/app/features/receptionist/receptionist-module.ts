import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceptionistRoutingModule } from './receptionist-routing-module';
import { LayoutModule } from '../../layout/layout-module';
import { ReceptionistDashboardComponent } from './components/receptionist-dashboard/receptionist-dashboard.component';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        ReceptionistRoutingModule,
        LayoutModule,
        ReceptionistDashboardComponent
    ]
})
export class ReceptionistModule { }
