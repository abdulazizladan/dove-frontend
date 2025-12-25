import { Component, OnInit, inject, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ReferringDoctorService } from '../../../../core/services/referring-doctor.service';
import { ReferringDoctor } from '../../../../core/models/referring-doctor.model';
import { HospitalFormComponent } from '../hospital-form/hospital-form.component';
import { DoctorFormComponent } from '../doctor-form/doctor-form.component';
import { Observable } from 'rxjs';

import { MatTabsModule } from '@angular/material/tabs';

@Component({
    selector: 'app-doctors-list',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        MatTabsModule,
        MatPaginatorModule
    ],
    styleUrls: ['./doctors-list.component.css'],
    templateUrl: './doctors-list.component.html'
})
export class DoctorsListComponent implements OnInit, AfterViewInit {
    private doctorService = inject(ReferringDoctorService);
    private dialog = inject(MatDialog);

    @ViewChild('doctorPaginator') doctorPaginator!: MatPaginator;
    @ViewChild('hospitalPaginator') hospitalPaginator!: MatPaginator;

    displayedColumns: string[] = ['name', 'email', 'phone', 'hospital', 'actions'];
    hospitalDisplayedColumns: string[] = ['name', 'address', 'phone', 'contact_person'];

    dataSource = new MatTableDataSource<ReferringDoctor>([]);
    hospitalDataSource = new MatTableDataSource<any>([]);

    ngOnInit() {
        this.loadDoctors();
        this.loadHospitals();
    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.doctorPaginator;
        this.hospitalDataSource.paginator = this.hospitalPaginator;
    }

    loadDoctors() {
        this.doctorService.getDoctors().subscribe(doctors => {
            this.dataSource.data = doctors;
        });
    }

    loadHospitals() {
        this.doctorService.getHospitals().subscribe(hospitals => {
            this.hospitalDataSource.data = hospitals;
        });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    applyHospitalFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.hospitalDataSource.filter = filterValue.trim().toLowerCase();
    }

    openHospitalDialog() {
        const dialogRef = this.dialog.open(HospitalFormComponent, {
            width: '500px'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.loadHospitals();
            }
        });
    }

    openDoctorDialog() {
        const dialogRef = this.dialog.open(DoctorFormComponent, {
            width: '500px'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.loadDoctors();
            }
        });
    }
}
