import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../../service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vender-list-add',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './vender-list-add.component.html',
  styleUrl: './vender-list-add.component.scss'
})
export class VenderListAddComponent {
  vendorForm!: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private service: ServiceService,
    private router: Router
  ) {
    this.vendorForm = this.fb.group({
      businessType: ['', Validators.required],
      vendorName: ['', Validators.required],
      vendorTradeName: [''],
      gstNumber: ['', [Validators.pattern(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/)]],
      vendorLocation: [''],
      contactNumber: [''],
      pinCode: ['']
    });
  }

  addVendor(): void {
    if (this.vendorForm.invalid) {
      this.vendorForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    const payload = this.vendorForm.value;

    const apiUrl = 'https://backend-sm8m.onrender.com/vendor';

    this.service.post(apiUrl, payload).subscribe({
      next: (res) => {
        this.loading = false;
        alert('✅ Vendor created successfully!');
        this.router.navigate(['/admin/vendor/view']); // Adjust route as needed

      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err?.error?.message || '❌ Failed to add vendor. Please try again.';
        console.error('Vendor Add Error:', err);
      }
    });
  }




}
