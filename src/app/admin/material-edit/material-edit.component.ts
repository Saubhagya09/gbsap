import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../service.service';

@Component({
  selector: 'app-material-edit',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './material-edit.component.html',
  styleUrl: './material-edit.component.scss'
})
export class MaterialEditComponent {
  materialForm!: FormGroup;
  materialId!: string;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private service: ServiceService,
    private router: Router
  ) {
    this.materialForm = this.fb.group({
      suppliedVendor: ['', Validators.required],
      materialName: ['', Validators.required],
      availableQuantity: ['', Validators.required],
      issuedQuantity: ['', Validators.required],
      requiredQuantity: ['', Validators.required],
      unitofMeasurement: ['', Validators.required],
      
      price: ['', Validators.required],
      date: ['', Validators.required]
    });
    console.log(this.materialForm);
    
  }
  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const id = params.get('materialId');
      if (id) {
        this.materialId = id;
        // this.initForm();
        this.fetchMaterialById(id);
      } else {
        this.error = 'No material ID found in URL';
        this.loading = false;
      }
    });
  }


  fetchMaterialById(id: string): void {
    const url = `https://backend-sm8m.onrender.com/materials/${id}`;
    this.service.get(url).subscribe({
      next: (data: any) => {
        console.log(data);
        this.materialForm.patchValue({
          suppliedVendor: data.suppliedVendor,
          materialName: data.materialName,
          availableQuantity: data.availableQuantity,
          issuedQuantity: data.issuedQuantity,
          requiredQuantity: data.requiredQuantity,
          unitofMeasurement: data.unitofMeasurement,
          price: data.price,
          date: data.date.split('T')[0]
        });
        this.loading = false;

      },
      error: (err) => {
        this.error = 'Failed to load material data.';
        console.error(err);
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.materialForm.invalid) return;

    const url = `https://backend-sm8m.onrender.com/materials/${this.materialId}`;
    const updatedData = this.materialForm.value;

    this.service.put(url, updatedData).subscribe({
      next: (response) => {
        console.log(response);

        alert('Material updated successfully!');
        this.router.navigate(['/admin/material/view'], {
          queryParams: { id: response.projectId }  // adjust if needed
        });
      },
      error: (err) => {
        console.error('Update failed:', err);
        alert('Failed to update material.');
      }
    });
  }

}
