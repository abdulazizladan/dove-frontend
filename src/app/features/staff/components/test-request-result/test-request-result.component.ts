import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TestResultData } from './test-request-result.model';

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

    form = this.fb.group({
        summary: ['', Validators.required],
        attachmentUrl: ['', [Validators.pattern(/https?:\/\/.+/)]]
    });

    onCancel() {
        this.dialogRef.close();
    }

    onSubmit() {
        if (this.form.valid) {
            this.dialogRef.close(this.form.value as TestResultData);
        }
    }
}
