import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { AdminLayout } from './admin-layout/admin-layout';
import { StaffLayout } from './staff-layout/staff-layout';
import { ReceptionistLayout } from './receptionist-layout/receptionist-layout.component';

@NgModule({
  declarations: [
    AdminLayout,
    StaffLayout,
    ReceptionistLayout
  ],
  imports: [
    CommonModule,
    RouterModule, // Needed for router-outlet
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule
  ],
  exports: [
    AdminLayout,
    StaffLayout,
    ReceptionistLayout
  ]
})
export class LayoutModule { }
