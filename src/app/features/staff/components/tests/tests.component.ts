import { Component, inject, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TestService } from '../../../../core/test/test.service';
import { Test } from '../../../../core/models/test.model';
import { TestFormComponent } from '../test-form/test-form.component';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
    selector: 'app-tests',
    templateUrl: './tests.component.html',
    styleUrls: ['./tests.component.scss'],
    standalone: false
})
export class TestsComponent implements OnInit, AfterViewInit {
    private testService = inject(TestService);
    private dialog = inject(MatDialog);

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    dataSource = new MatTableDataSource<any>([]);
    displayedColumns: string[] = ['id', 'name', 'price', 'departmentId'];

    ngOnInit(): void {
        this.loadTests();
    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
    }

    loadTests(): void {
        this.testService.getTests().subscribe(tests => {
            this.dataSource.data = tests;
        });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    openAddTestDialog(): void {
        const dialogRef = this.dialog.open(TestFormComponent, {
            width: '400px'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.loadTests();
            }
        });
    }
}
