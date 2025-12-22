import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PatientService } from '../../../../core/patient/patient.service';
import { Patient } from '../../../../core/models/patient.model';

import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared-module';

@Component({
    selector: 'app-patient-form',
    templateUrl: './patient-form.component.html',
    styleUrl: './patient-form.component.scss',
    standalone: true,
    imports: [CommonModule, SharedModule]
})
export class PatientFormComponent {
    private fb = inject(FormBuilder);
    private patientService = inject(PatientService);
    private dialogRef = inject(MatDialogRef<PatientFormComponent>);

    @Inject(MAT_DIALOG_DATA) public data: Patient | undefined;

    form: FormGroup = this.fb.group({
        name: ['', Validators.required],
        date_of_birth: [null, Validators.required],
        contact: ['', Validators.required], // Assumed required based on template
        gender: ['Male', Validators.required]
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
