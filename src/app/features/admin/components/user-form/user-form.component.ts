import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../../../core/services/user.service';
import { User, UserRole } from '../../../../core/models/user.model';

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrl: './user-form.component.scss',
    standalone: false
})
export class UserFormComponent {
    private fb = inject(FormBuilder);
    private userService = inject(UserService);
    private dialogRef = inject(MatDialogRef<UserFormComponent>);

    @Inject(MAT_DIALOG_DATA) public data: User | undefined; // Fallback injection if needed, but constructor param is cleaner usually

    form: FormGroup = this.fb.group({
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: [''], // Optional if editing
        role: [UserRole.STAFF, Validators.required],
        firstName: [''],
        lastName: ['']
    });

    isEditMode = false;
    roles = Object.values(UserRole);

    constructor(@Inject(MAT_DIALOG_DATA) public user: User | undefined) {
        if (user) {
            this.isEditMode = true;
            this.form.patchValue(user);
            this.form.get('password')?.clearValidators(); // Don't require password on edit
        } else {
            this.form.get('password')?.setValidators(Validators.required);
        }
        this.form.get('password')?.updateValueAndValidity();
    }

    onSubmit(): void {
        if (this.form.valid) {
            const user = this.form.value;
            if (this.isEditMode && this.user) {
                this.userService.updateUser(this.user.id, user).subscribe(() => {
                    this.dialogRef.close(true);
                });
            } else {
                this.userService.createUser(user).subscribe(() => {
                    this.dialogRef.close(true);
                });
            }
        }
    }

    onCancel(): void {
        this.dialogRef.close(false);
    }
}
