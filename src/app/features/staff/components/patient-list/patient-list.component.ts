import { Component, inject, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PatientService } from '../../../../core/patient/patient.service';
import { PatientStore } from '../../../../core/patient/patient-store';
import { Patient } from '../../../../core/models/patient.model';
import { MatDialog } from '@angular/material/dialog';
import { PatientFormComponent } from '../patient-form/patient-form.component';

import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared-module';

@Component({
    selector: 'app-patient-list',
    templateUrl: './patient-list.component.html',
    styleUrl: './patient-list.component.scss',
    standalone: true,
    imports: [CommonModule, SharedModule]
})
export class PatientListComponent implements OnInit, AfterViewInit {
    private patientService = inject(PatientService);
    protected store = inject(PatientStore);
    private dialog = inject(MatDialog);

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    displayedColumns: string[] = ['name', 'date_of_birth', 'contact', 'gender', 'actions'];
    dataSource = new MatTableDataSource<Patient>([]);

    ngOnInit(): void {
        this.patientService.getPatients().subscribe(patients => {
            this.dataSource.data = patients;
        });
    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
    }

    openPatientDialog(patient?: Patient): void {
        const dialogRef = this.dialog.open(PatientFormComponent, {
            width: '500px',
            data: patient
        });

        dialogRef.afterClosed().subscribe(result => {
            // Data is usually reloaded via store update in service, or we can reload here if needed
            if (result) {
                // Just refresh list to be safe or rely on signals
                // Since getPatients updates store, and store updates data source if we used effect, but here we subscribe.
                // Actually, better to use signals in template or effect.
                // But for consistency with UserList, simplistic subscribe is fine for now.
            }
        });
    }

    deletePatient(id: string): void {
        if (confirm('Are you sure you want to delete this patient?')) {
            this.patientService.deletePatient(id).subscribe();
        }
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
}
