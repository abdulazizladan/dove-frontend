import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { RequestService } from '../../../../core/request/request.service';
import { PatientService } from '../../../../core/patient/patient.service';
import { TestType, RequestStatus } from '../../../../core/models/test-request.model';
import { Patient } from '../../../../core/models/patient.model';

@Component({
    selector: 'app-test-request-form',
    templateUrl: './test-request-form.component.html',
    styleUrl: './test-request-form.component.scss',
    standalone: false
})
export class TestRequestFormComponent implements OnInit {
    private fb = inject(FormBuilder);
    private requestService = inject(RequestService);
    private patientService = inject(PatientService);
    private dialogRef = inject(MatDialogRef<TestRequestFormComponent>);

    patients: Patient[] = [];
    testTypes = Object.values(TestType);
    priorities = ['LOW', 'MEDIUM', 'HIGH'];

    form: FormGroup = this.fb.group({
        patientId: ['', Validators.required],
        testType: ['', Validators.required],
        priority: ['MEDIUM', Validators.required],
        notes: ['']
    });

    ngOnInit(): void {
        this.patientService.getPatients().subscribe(patients => {
            this.patients = patients;
        });
    }

    onSubmit(): void {
        if (this.form.valid) {
            const formValue = this.form.value;
            const selectedPatient = this.patients.find(p => p.id === formValue.patientId);

            const requestData = {
                ...formValue,
                patientName: selectedPatient ? `${selectedPatient.firstName} ${selectedPatient.lastName}` : 'Unknown',
                status: RequestStatus.PENDING,
                createdAt: new Date(),
                updatedAt: new Date()
            };

            this.requestService.createRequest(requestData).subscribe(() => {
                this.dialogRef.close(true);
            });
        }
    }

    onCancel(): void {
        this.dialogRef.close(false);
    }
}
