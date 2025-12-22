import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./features/auth/auth-module').then(m => m.AuthModule) },
  { path: 'admin', loadChildren: () => import('./features/admin/admin-module').then(m => m.AdminModule) },
  { path: 'staff', loadChildren: () => import('./features/staff/staff-module').then(m => m.StaffModule) },
  { path: 'receptionist', loadChildren: () => import('./features/receptionist/receptionist-module').then(m => m.ReceptionistModule) },
  { path: '', redirectTo: 'auth', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
