import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { ReferringDoctorService } from '../../../../core/services/referring-doctor.service';
import { ReferringDoctor } from '../../../../core/models/referring-doctor.model';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-doctor-details',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatDividerModule
    ],
    templateUrl: './doctor-details.component.html',
    styleUrls: ['./doctor-details.component.css']
})
export class DoctorDetailsComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private doctorService = inject(ReferringDoctorService);
    doctor$!: Observable<ReferringDoctor>;

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.doctor$ = this.doctorService.getDoctorById(id);
        }
    }
}
