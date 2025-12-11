import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    protected store = inject(OrgStore);

    // Simple form for Org details
    form: FormGroup = this.fb.group({
        name: ['', Validators.required],
        address: ['', Validators.required]
    });

    ngOnInit(): void {
        this.orgService.getOrganization().subscribe(org => {
            if (org) {
                this.form.patchValue(org);
            }
        });
    }

    onSubmit(): void {
        if (this.form.valid) {
            this.orgService.updateOrganization(this.form.value).subscribe();
        }
    }
}
