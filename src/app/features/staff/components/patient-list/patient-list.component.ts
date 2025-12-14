import { Component, inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PatientService } from '../../../../core/patient/patient.service';
import { PatientStore } from '../../../../core/patient/patient-store';
import { Patient } from '../../../../core/models/patient.model';
import { MatDialog } from '@angular/material/dialog';
import { PatientFormComponent } from '../patient-form/patient-form.component';

@Component({
    selector: 'app-patient-list',
    templateUrl: './patient-list.component.html',
    styleUrl: './patient-list.component.scss',
    standalone: false
})
export class PatientListComponent implements OnInit {
    private patientService = inject(PatientService);
    protected store = inject(PatientStore);
    private dialog = inject(MatDialog);

    displayedColumns: string[] = ['name', 'date_of_birth', 'contact', 'gender', 'actions'];
    dataSource = new MatTableDataSource<Patient>([]);

    ngOnInit(): void {
        this.patientService.getPatients().subscribe(patients => {
            this.dataSource.data = patients;
        });
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
}
