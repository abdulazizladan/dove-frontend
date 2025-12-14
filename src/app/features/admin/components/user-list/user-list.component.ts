import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../../core/services/user.service';
import { User } from '../../../../core/models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from '../user-form/user-form.component';
import { MatTableDataSource } from '@angular/material/table';

import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrl: './user-list.component.scss',
    standalone: false
})
export class UserListComponent implements OnInit {
    private userService = inject(UserService);
    private dialog = inject(MatDialog);
    // ...


    displayedColumns: string[] = ['full_name', 'email', 'role', 'isActive', 'created_at', 'actions'];
    dataSource = new MatTableDataSource<User>([]);

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    ngOnInit(): void {
        this.loadUsers();
    }

    loadUsers(): void {
        this.userService.getUsers().subscribe(users => {
            this.dataSource.data = users;
        });
    }

    openUserDialog(user?: User): void {
        const dialogRef = this.dialog.open(UserFormComponent, {
            width: '400px',
            data: user
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.loadUsers();
            }
        });
    }

    deleteUser(id: string): void {
        if (confirm('Are you sure you want to delete this user?')) {
            this.userService.deleteUser(id).subscribe(() => this.loadUsers());
        }
    }

    toggleStatus(user: User, event: MatSlideToggleChange): void {
        const newStatus = event.checked ? 'active' : 'suspended';
        // Optimistically update or wait? Let's subscribe.
        // We need to support partial update in generic update method or cast.
        // Assuming updateUser takes partial user.
        this.userService.updateUser(user.id, { status: newStatus }).subscribe({
            next: () => {
                user.status = newStatus;
                user.isActive = newStatus === 'active';
            },
            error: (err) => {
                console.error('Failed to update status', err);
                event.source.checked = !event.checked; // Revert
            }
        });
    }
}
