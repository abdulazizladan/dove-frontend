import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrganizationService } from '../../../../core/organization/org.service';
import { TestService } from '../../../../core/test/test.service';
import { Observable, map, switchMap, forkJoin } from 'rxjs';
import { Department } from '../../../../core/models/organization.model';
import { Test } from '../../../../core/models/test.model';

@Component({
  selector: 'app-department-details',
  templateUrl: './department-details.component.html',
  styleUrls: ['./department-details.component.css'],
  standalone: false
})
export class DepartmentDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private organizationService = inject(OrganizationService);
  private testService = inject(TestService);

  department$!: Observable<Department>;
  tests$!: Observable<Test[]>;

  testsCount: number = 0;
  requestsCount: number = 0;
  monthlyRevenue: number = 0;

  ngOnInit(): void {
    const departmentId = this.route.snapshot.paramMap.get('id');

    if (departmentId) {
      // Fetch department details
      this.department$ = this.organizationService.getDepartmentById(departmentId);

      // Fetch tests for this department
      this.tests$ = this.testService.getTests().pipe(
        map(tests => tests.filter(test => test.departmentId === departmentId))
      );

      // Subscribe to get counts
      this.tests$.subscribe(tests => {
        this.testsCount = tests.length;
        // Calculate mock statistics (you can replace with actual API calls)
        this.requestsCount = Math.floor(Math.random() * 100) + 50;
        this.monthlyRevenue = tests.reduce((sum, test) => sum + (test.price || 0), 0) * 10;
      });
    }
  }
}
