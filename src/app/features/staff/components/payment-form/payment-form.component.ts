import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { PaymentMode } from '../../../../core/models/payment.model';

@Component({
    selector: 'app-payment-form',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatCardModule,
        MatIconModule
    ],
    templateUrl: './payment-form.component.html'
})
export class PaymentFormComponent {
    private fb = inject(FormBuilder);
    private dialogRef = inject(MatDialogRef<PaymentFormComponent>);

    paymentModes = Object.values(PaymentMode);

    form: FormGroup = this.fb.group({
        amount: ['', [Validators.required, Validators.min(0)]],
        mode: ['', Validators.required]
    });

    submit() {
        if (this.form.valid) {
            this.dialogRef.close(this.form.value);
        }
    }
}
