import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../../../core/services/user.service';
import { User, UserRole } from '../../../../core/models/user.model';
import { OrganizationService } from '../../../../core/organization/org.service';
import { Designation } from '../../../../core/models/organization.model';

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrl: './user-form.component.scss',
    standalone: false
})
export class UserFormComponent implements OnInit {
    private fb = inject(FormBuilder);
    private userService = inject(UserService);
    private orgService = inject(OrganizationService);
    private dialogRef = inject(MatDialogRef<UserFormComponent>);

    @Inject(MAT_DIALOG_DATA) public data: User | undefined;

    form: FormGroup = this.fb.group({
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: [''],
        role: [UserRole.STAFF, Validators.required],
        designationId: ['']
    });

    isEditMode = false;
    roles = Object.values(UserRole);
    designations: Designation[] = [];

    constructor(@Inject(MAT_DIALOG_DATA) public user: User | undefined) {
        if (user) {
            this.isEditMode = true;
            this.form.patchValue(user);
        } else {
            this.form.get('password')?.setValidators([Validators.required, Validators.minLength(8)]);
        }
        this.form.get('password')?.updateValueAndValidity();
    }

    ngOnInit(): void {
        this.loadDesignations();
    }

    loadDesignations(): void {
        this.orgService.getOrganization().subscribe(orgs => {
            if (orgs && orgs.length > 0) {
                const org = orgs[0];
                if (org.departments) {
                    // Flatten all designations from all departments
                    this.designations = org.departments.reduce((acc, dept) => {
                        return acc.concat(dept.designations || []);
                    }, [] as Designation[]);
                }
            }
        });
    }

    onSubmit(): void {
        if (this.form.valid) {
            // Clone the form value to avoid mutating the form state if we were to continue using it
            const user = { ...this.form.value };

            // Sanitize designationId: if empty string or null, remove it or ensure it is what backend expects (likely remove if optional)
            if (!user.designationId) {
                delete user.designationId;
            }

            if (this.isEditMode && this.user) {
                // Remove password if empty in edit mode
                if (!user.password) {
                    delete user.password;
                }
                this.userService.updateUser(this.user.id, user).subscribe({
                    next: () => this.dialogRef.close(true),
                    error: (err) => console.error('Update failed', err) // Add error handling logging
                });
            } else {
                this.userService.createUser(user).subscribe({
                    next: () => this.dialogRef.close(true),
                    error: (err) => console.error('Create failed', err) // Add error handling logging
                });
            }
        }
    }

    onCancel(): void {
        this.dialogRef.close(false);
    }
}
