import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing-module';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { OrganizationComponent } from './components/organization/organization.component';
import { ActivityLogComponent } from './components/activity-log/activity-log.component';
import { DepartmentDetailsComponent } from './components/department-details/department-details.component';
import { DepartmentFormComponent } from './components/department-form/department-form.component';
import { SharedModule } from '../../shared/shared-module';
import { LayoutModule } from '../../layout/layout-module';


@NgModule({
  declarations: [
    UserListComponent,
    UserFormComponent,
    OrganizationComponent,
    ActivityLogComponent,
    DepartmentDetailsComponent,
    DepartmentFormComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    LayoutModule
  ]
})
export class AdminModule { }
