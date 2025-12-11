import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PatientListComponent } from './components/patient-list/patient-list.component';
import { TestRequestListComponent } from './components/test-request-list/test-request-list.component';

const routes: Routes = [
  { path: 'patients', component: PatientListComponent },
  { path: 'requests', component: TestRequestListComponent },
  { path: '', redirectTo: 'patients', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
