import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../service.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-inventory-edit',
  imports: [MatProgressSpinnerModule, CommonModule, ReactiveFormsModule],
  templateUrl: './inventory-edit.component.html',
  styleUrl: './inventory-edit.component.scss'
})
export class InventoryEditComponent {
  inventoryId!: string;
  loading = true;
  error: string | null = null;
  inventoryForm!: FormGroup;
  constructor(private route: ActivatedRoute,
    private fb: FormBuilder,
    private service: ServiceService,
    private router: Router
  ) {
    this.inventoryForm = this.fb.group({
      itemNo: ['', Validators.required],
      materialName: ['', Validators.required],
      description: [''],
      unit: ['', Validators.required],
      quantity: ['', Validators.required],
      unitPrice: ['', Validators.required],
      supplier: [''],
      notes: ['']
    });
  }
  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const id = params.get("id");
      console.log(id);

      if (id) {
        this.inventoryId = id;

        this.fetchInventoryItem(this.inventoryId)
      } else {
        this.error = 'No material ID found in URL';
        this.loading = false;
      }
    });
  }


  fetchInventoryItem(id: string): void {
    this.service.get(`https://backend-sm8m.onrender.com/inventory/${id}`).subscribe({
      next: (data) => {
        this.inventoryForm.patchValue(data);
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load inventory:', err);
        this.error = 'Failed to load inventory item.';
        this.loading = false;
      }
    });
  }
  onSubmit() {
    if (this.inventoryForm.invalid) return;

    const updatedData = this.inventoryForm.value;
    console.log(updatedData);

    this.service.put(`https://backend-sm8m.onrender.com/inventory/${this.inventoryId}`, updatedData)
      .subscribe({
        next: (response) => {
          console.log(response);

          alert('Inventory item updated successfully.');
          this.router.navigate(['/admin/inventory/view']);
        },
        error: (err) => {
          console.error('Failed to update inventory:', err);
          alert('Update failed. Try again.');
        }
      });
  }
}
