import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReferringDoctorService } from '../../../../core/services/referring-doctor.service';

@Component({
    selector: 'app-hospital-form',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule
    ],
    templateUrl: './hospital-form.component.html'
})
export class HospitalFormComponent {
    private fb = inject(FormBuilder);
    private service = inject(ReferringDoctorService);
    private dialogRef = inject(MatDialogRef<HospitalFormComponent>);

    form: FormGroup = this.fb.group({
        name: ['', Validators.required],
        address: ['', Validators.required],
        phone: ['', Validators.required],
        contact_person: ['', Validators.required]
    });

    submit() {
        if (this.form.valid) {
            this.service.createHospital(this.form.value).subscribe({
                next: (res) => this.dialogRef.close(res),
                error: (err) => console.error(err)
            });
        }
    }
}
