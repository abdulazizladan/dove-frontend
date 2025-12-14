import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserListComponent } from './components/user-list/user-list.component';
import { OrganizationComponent } from './components/organization/organization.component';
import { ActivityLogComponent } from './components/activity-log/activity-log.component';
import { DepartmentDetailsComponent } from './components/department-details/department-details.component';
import { AdminLayout } from '../../layout/admin-layout/admin-layout';

const routes: Routes = [
  {
    path: '',
    component: AdminLayout,
    children: [
      { path: 'staff', component: UserListComponent },
      { path: 'organization', component: OrganizationComponent },
      { path: 'organization/departments/:id', component: DepartmentDetailsComponent },
      { path: 'logs', component: ActivityLogComponent },
      { path: '', redirectTo: 'staff', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
