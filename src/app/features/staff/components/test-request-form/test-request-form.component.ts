import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { RequestService } from '../../../../core/request/request.service';
import { PatientService } from '../../../../core/patient/patient.service';
import { TestService } from '../../../../core/test/test.service';
import { RequestStatus } from '../../../../core/models/test-request.model';
import { Patient } from '../../../../core/models/patient.model';
import { Test } from '../../../../core/models/test.model';

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
    private testService = inject(TestService);
    private dialogRef = inject(MatDialogRef<TestRequestFormComponent>);

    patients: Patient[] = [];
    tests: Test[] = [];
    priorities = ['LOW', 'MEDIUM', 'HIGH'];

    form: FormGroup = this.fb.group({
        patientId: ['', Validators.required],
        testId: ['', Validators.required],
        priority: ['MEDIUM', Validators.required],
        discount: [0],
        discountReason: [''],
        notes: ['']
    });

    ngOnInit(): void {
        this.patientService.getPatients().subscribe(patients => {
            this.patients = patients;
        });
        this.testService.getTests().subscribe(tests => {
            this.tests = tests;
        });
    }

    onSubmit(): void {
        if (this.form.valid) {
            const formValue = this.form.value;
            const selectedPatient = this.patients.find(p => p.id === formValue.patientId);

            const requestData = {
                patientId: formValue.patientId,
                patient_id: formValue.patientId,
                testId: formValue.testId, // Reverted to testId as per backend validation error
                priority: formValue.priority,
                discount: formValue.discount,
                discount_reason: formValue.discountReason,
                notes: formValue.notes,
                // Removing deduced fields that might not be allowed in Create DTO
                // patientName, status, createdAt, updatedAt are likely handled by backend or returned, not sent on create
            };

            this.requestService.createRequest(requestData as any).subscribe({
                next: () => this.dialogRef.close(true),
                error: (err) => console.error('Error creating request:', err)
            });
        }
    }

    onCancel(): void {
        this.dialogRef.close(false);
    }
}
