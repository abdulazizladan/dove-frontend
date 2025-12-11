import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PatientService } from '../../../../core/patient/patient.service';
import { Patient } from '../../../../core/models/patient.model';

@Component({
    selector: 'app-patient-form',
    templateUrl: './patient-form.component.html',
    styleUrl: './patient-form.component.scss',
    standalone: false
})
export class PatientFormComponent {
    private fb = inject(FormBuilder);
    private patientService = inject(PatientService);
    private dialogRef = inject(MatDialogRef<PatientFormComponent>);

    @Inject(MAT_DIALOG_DATA) public data: Patient | undefined;

    form: FormGroup = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: [''],
        dateOfBirth: [null, Validators.required],
        address: ['']
    });

    isEditMode = false;

    constructor(@Inject(MAT_DIALOG_DATA) public patient: Patient | undefined) {
        if (patient) {
            this.isEditMode = true;
            this.form.patchValue(patient);
        }
    }

    onSubmit(): void {
        if (this.form.valid) {
            const patientData = this.form.value;
            if (this.isEditMode && this.patient) {
                this.patientService.updatePatient(this.patient.id, patientData).subscribe(() => {
                    this.dialogRef.close(true);
                });
            } else {
                this.patientService.createPatient(patientData).subscribe(() => {
                    this.dialogRef.close(true);
                });
            }
        }
    }

    onCancel(): void {
        this.dialogRef.close(false);
    }
}
