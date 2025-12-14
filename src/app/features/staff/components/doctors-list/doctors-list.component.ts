import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ReferringDoctorService } from '../../../../core/services/referring-doctor.service';
import { ReferringDoctor } from '../../../../core/models/referring-doctor.model';
import { HospitalFormComponent } from '../hospital-form/hospital-form.component';
import { DoctorFormComponent } from '../doctor-form/doctor-form.component';
import { Observable } from 'rxjs';

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
        MatDialogModule
    ],
    templateUrl: './doctors-list.component.html'
})
export class DoctorsListComponent implements OnInit {
    private doctorService = inject(ReferringDoctorService);
    private dialog = inject(MatDialog);

    displayedColumns: string[] = ['name', 'email', 'phone', 'hospital', 'actions'];
    dataSource = new MatTableDataSource<ReferringDoctor>([]);

    ngOnInit() {
        this.loadDoctors();
    }

    loadDoctors() {
        this.doctorService.getDoctors().subscribe(doctors => {
            this.dataSource.data = doctors;
        });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    openHospitalDialog() {
        this.dialog.open(HospitalFormComponent, {
            width: '500px'
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
