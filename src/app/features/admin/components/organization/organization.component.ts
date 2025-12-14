import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Organization, Department } from '../../../../core/models/organization.model';
import { OrganizationService } from '../../../../core/organization/org.service';
import { OrgStore } from '../../../../core/organization/org-store';
import { DepartmentFormComponent } from '../department-form/department-form.component';

@Component({
    selector: 'app-organization',
    templateUrl: './organization.component.html',
    styleUrl: './organization.component.scss',
    standalone: false
})
export class OrganizationComponent implements OnInit {
    private fb = inject(FormBuilder);
    private orgService = inject(OrganizationService);
    private router = inject(Router);
    private dialog = inject(MatDialog);
    protected store = inject(OrgStore);

    departments$: Observable<Department[]> | null = null;

    // Simple form for Org details
    form: FormGroup = this.fb.group({
        name: ['', Validators.required],
        address: ['', Validators.required]
    });

    ngOnInit(): void {
        this.orgService.getOrganization().subscribe();
        this.departments$ = this.orgService.getDepartments();
    }

    onSubmit(): void {
        if (this.form.valid) {
            this.orgService.updateOrganization(this.form.value).subscribe();
        }
    }

    navigateToDepartment(id: string): void {
        this.router.navigate(['admin', 'organization', 'departments', id]);
    }

    openDepartmentDialog(): void {
        const org = this.store.organization();
        if (!org) return;

        const dialogRef = this.dialog.open(DepartmentFormComponent, {
            width: '400px',
            data: { organizationId: org.id }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.departments$ = this.orgService.getDepartments();
            }
        });
    }
}
