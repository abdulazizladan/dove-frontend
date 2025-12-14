import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrganizationService } from '../../../../core/organization/org.service';

@Component({
    selector: 'app-department-form',
    templateUrl: './department-form.component.html',
    standalone: false
})
export class DepartmentFormComponent {
    private fb = inject(FormBuilder);
    private orgService = inject(OrganizationService);
    private dialogRef = inject(MatDialogRef<DepartmentFormComponent>);

    form: FormGroup;
    isLoading = false;

    constructor(@Inject(MAT_DIALOG_DATA) public data: { organizationId: string }) {
        this.form = this.fb.group({
            name: ['', Validators.required]
        });
    }

    onSubmit(): void {
        if (this.form.valid) {
            this.isLoading = true;
            const departmentData = {
                name: this.form.value.name,
                organizationId: this.data.organizationId
            };

            this.orgService.addDepartment(departmentData).subscribe({
                next: (res) => {
                    this.isLoading = false;
                    this.dialogRef.close(true);
                },
                error: (err) => {
                    console.error(err);
                    this.isLoading = false;
                    // Optionally handle error feedback here
                }
            });
        }
    }

    onCancel(): void {
        this.dialogRef.close(false);
    }
}
