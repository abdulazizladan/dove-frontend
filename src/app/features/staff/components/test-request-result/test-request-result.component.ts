import { Component, inject, Inject, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TestResultData, TestResult } from './test-request-result.model';
import { AuthService } from '../../../../core/auth/auth.service';
import { jwtDecode } from 'jwt-decode';

@Component({
    selector: 'app-test-request-result',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule
    ],
    templateUrl: './test-request-result.component.html',
    styleUrls: ['./test-request-result.component.css']
})
export class TestRequestResultComponent {
    private dialogRef = inject(MatDialogRef<TestRequestResultComponent>);
    private fb = inject(FormBuilder);
    private authService = inject(AuthService);

    existingResult?: TestResult;
    isViewMode: boolean = false;

    form = this.fb.group({
        summary: ['', Validators.required],
        attachmentUrl: ['', [Validators.pattern(/https?:\/\/.+/)]]
    });

    constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data?: TestResult) {
        if (data) {
            this.existingResult = data;
            this.isViewMode = true;
            // Populate form with existing data
            this.form.patchValue({
                summary: data.summary || '',
                attachmentUrl: data.attachment || ''
            });
            // Disable form in view mode
            this.form.disable();
        }
    }

    get uploaderName(): string {
        if (this.existingResult?.uploadedBy) {
            const { first_name, last_name } = this.existingResult.uploadedBy;
            return `${first_name} ${last_name}`.trim();
        }
        return '';
    }

    onCancel() {
        this.dialogRef.close();
    }

    onSubmit() {
        if (this.form.valid) {
            // Get the token and decode it to extract the user ID
            const token = this.authService.getToken();
            let uploadedById: string | undefined;

            if (token) {
                const decodedToken: any = jwtDecode(token);
                uploadedById = decodedToken.sub; // Extract user ID from token
            }

            const resultData: TestResultData = {
                ...this.form.value as TestResultData,
                uploadedById
            };

            this.dialogRef.close(resultData);
        }
    }
}
