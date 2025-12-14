import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Organization, Department } from '../../../../core/models/organization.model';
// Duplicate import removed
import { OrganizationService } from '../../../../core/organization/org.service';
import { OrgStore } from '../../../../core/organization/org-store';

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
}
