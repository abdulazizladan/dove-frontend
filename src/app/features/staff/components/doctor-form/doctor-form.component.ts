import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ReferringDoctorService } from '../../../../core/services/referring-doctor.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-doctor-form',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatCardModule,
        MatIconModule
    ],
    templateUrl: './doctor-form.component.html'
})
export class DoctorFormComponent implements OnInit {
    private fb = inject(FormBuilder);
    private service = inject(ReferringDoctorService);
    private dialogRef = inject(MatDialogRef<DoctorFormComponent>);

    hospitals$!: Observable<any[]>;

    form: FormGroup = this.fb.group({
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', Validators.required],
        hospitalId: ['', Validators.required]
    });

    ngOnInit() {
        this.hospitals$ = this.service.getHospitals();
    }

    submit() {
        if (this.form.valid) {
            this.service.createDoctor(this.form.value).subscribe({
                next: (res) => this.dialogRef.close(res),
                error: (err) => console.error(err)
            });
        }
    }
}
