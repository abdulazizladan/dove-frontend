import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PatientListComponent } from './components/patient-list/patient-list.component';
import { TestRequestListComponent } from './components/test-request-list/test-request-list.component';
import { TestsComponent } from './components/tests/tests.component';
import { DoctorsListComponent } from './components/doctors-list/doctors-list.component';
import { DoctorDetailsComponent } from './components/doctor-details/doctor-details.component';
import { TestRequestDetailsComponent } from './components/test-request-details/test-request-details.component';
import { StaffLayout } from '../../layout/staff-layout/staff-layout';

const routes: Routes = [
  {
    path: '',
    component: StaffLayout,
    children: [
      { path: 'patients', component: PatientListComponent },
      { path: 'requests', component: TestRequestListComponent },
      { path: 'request-details/:id', component: TestRequestDetailsComponent },
      { path: 'tests', component: TestsComponent },
      { path: 'doctors', component: DoctorsListComponent },
      { path: 'doctor-details/:id', component: DoctorDetailsComponent },
      { path: '', redirectTo: 'patients', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
