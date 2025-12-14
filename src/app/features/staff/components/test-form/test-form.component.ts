import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TestService } from '../../../../core/test/test.service';
import { OrganizationService } from '../../../../core/organization/org.service';
import { Department } from '../../../../core/models/organization.model';

@Component({
    selector: 'app-test-form',
    templateUrl: './test-form.component.html',
    styleUrls: ['./test-form.component.scss'],
    standalone: false
})
export class TestFormComponent implements OnInit {
    private fb = inject(FormBuilder);
    private testService = inject(TestService);
    private orgService = inject(OrganizationService);
    private dialogRef = inject(MatDialogRef<TestFormComponent>);

    form: FormGroup = this.fb.group({
        id: ['', Validators.required],
        name: ['', Validators.required],
        price: [null, [Validators.required, Validators.min(0)]],
        departmentId: ['', Validators.required]
    });

    departments: Department[] = [];

    ngOnInit(): void {
        this.loadDepartments();
    }

    loadDepartments(): void {
        this.orgService.getDepartments().subscribe(depts => {
            this.departments = depts;
        });
    }

    onSubmit(): void {
        if (this.form.valid) {
            this.testService.createTest(this.form.value).subscribe({
                next: () => this.dialogRef.close(true),
                error: (err) => console.error('Failed to create test', err)
            });
        }
    }

    onCancel(): void {
        this.dialogRef.close(false);
    }
}
