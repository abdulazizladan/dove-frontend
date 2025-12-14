import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-department-details',
    template: `
    <div class="container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Department Details</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <p>Department ID: {{ departmentId }}</p>
          <p>Details content coming soon...</p>
        </mat-card-content>
      </mat-card>
    </div>
  `,
    styles: [`
    .container { padding: 20px; }
  `],
    standalone: false
})
export class DepartmentDetailsComponent implements OnInit {
    private route = inject(ActivatedRoute);
    protected departmentId: string | null = null;

    ngOnInit(): void {
        this.departmentId = this.route.snapshot.paramMap.get('id');
    }
}
