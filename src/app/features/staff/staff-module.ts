import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffRoutingModule } from './staff-routing-module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { PatientListComponent } from './components/patient-list/patient-list.component';
import { PatientFormComponent } from './components/patient-form/patient-form.component';
import { TestRequestListComponent } from './components/test-request-list/test-request-list.component';
import { TestRequestFormComponent } from './components/test-request-form/test-request-form.component';
import { PaymentSummaryComponent } from './components/payment-summary/payment-summary.component';
import { SharedModule } from '../../shared/shared-module';
import { LayoutModule } from '../../layout/layout-module';


import { TestsComponent } from './components/tests/tests.component';
import { TestFormComponent } from './components/test-form/test-form.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    TestsComponent,
    TestFormComponent
  ],
  imports: [
    CommonModule,
    StaffRoutingModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    SharedModule,
    LayoutModule,
    FlexLayoutModule,
    PatientListComponent,
    PatientFormComponent,
    TestRequestListComponent,
    TestRequestFormComponent,
    PaymentSummaryComponent
  ]
})
export class StaffModule { }
