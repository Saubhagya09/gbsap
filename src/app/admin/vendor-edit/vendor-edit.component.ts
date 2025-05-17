import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vendor-edit',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './vendor-edit.component.html',
  styleUrl: './vendor-edit.component.scss'
})
export class VendorEditComponent {
  vendorId: string | null = null;
  vendorForm!: FormGroup;
  loading = true;
  error: string | null = null;
  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private service: ServiceService) {
    this.vendorForm = this.fb.group({
      businessType: ['', Validators.required],
      vendorName: ['', Validators.required],
      vendorTradeName: [''],
      vendorLocation: [''],
      gstNumber: [''],
      contactNumber: ['']
    });
  }
  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.vendorId = params.get("vendorId")
      console.log("progressId", this.vendorId)
      if (this.vendorId) {
        this.loadVendor(this.vendorId)
      } else {
        this.error = "No task ID provided.";
      }

    })
  }

  loadVendor(id: string) {
    const url = `https://backend-sm8m.onrender.com/vendor/${id}`;
    this.service.get(url).subscribe({
      next: (data: any) => {
        console.log(data);

        this.vendorForm.patchValue({


          businessType: data.businessType,
          vendorName: data.vendorName,
          vendorTradeName: data.vendorTradeName,
          vendorLocation: data.vendorLocation,
          gstNumber: data.gstNumber,
          contactNumber: data.contactNumber,
          pinCode: data.pinCode


        });
        // this.loading = false;
      },
      error: (err) => {
        console.log(err);

        this.error = "Failed to load vendor.";
        this.loading = false;
        console.error(err);
      }
    });
  }
  onSubmit() {
    if (!this.vendorId || this.vendorForm.invalid) return;

    const updateUrl = `https://backend-sm8m.onrender.com/vendor/${this.vendorId}`;
    this.service.put(updateUrl, this.vendorForm.value).subscribe({
      next: (res) => {
        console.log(res);

        alert('Task updated successfully!');
        this.router.navigate(['/admin/vendor/view'], {
          queryParams: { id: res._id }
        });
      },
      error: (err) => {
        this.error = 'Failed to update task.';
        console.error(err);
      }
    });
  }
}

