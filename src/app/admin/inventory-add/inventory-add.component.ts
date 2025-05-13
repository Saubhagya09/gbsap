import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-inventory-add',
  imports: [ReactiveFormsModule,MatFormFieldModule,MatInputModule,MatNativeDateModule,MatButtonModule],
  templateUrl: './inventory-add.component.html',
  styleUrl: './inventory-add.component.scss'
})
export class InventoryAddComponent {
 inventoryForm: FormGroup;
  projectId: string | null = null;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private http: HttpClient) {
    this.inventoryForm = this.fb.group({
      itemNo: ['', Validators.required],
      materialName: ['', Validators.required],
      description: ['', Validators.required],
      unit: ['', Validators.required],
      quantity: ['', Validators.required],
      unitPrice: ['', Validators.required],
      supplier: ['', Validators.required],
      notes: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.projectId = params.get("id")
      console.log(this.projectId)


    })
  }

  addInventoryEntry(): void {
    if (this.inventoryForm.valid) {
      console.log('Form Data:', this.inventoryForm.value);

      const formData = this.inventoryForm.value
      const taskPayload = {
        projectId: this.projectId,
        itemNo: formData.itemNo,
        materialName: formData.materialName,
        description: formData.description,
        unit: formData.unit,
        quantity: formData.quantity,
        unitPrice: formData.unitPrice,
        supplier: formData.supplier,
        notes: formData.notes,

      };
      console.log(taskPayload);

      this.http.post('https://backend-sm8m.onrender.com/inventory', taskPayload).subscribe({
        next: (response: any) => {
          console.log('Inventory created successfully:', response);
          // Optionally redirect or reset form
          // this.materialForm.reset();
          this.router.navigate(['/admin/inventory/view'], { queryParams: { id: this.projectId } }); // Adjust the route as needed
        },
        error: (error: any) => {
          console.error('Error creating task:', error);
          // Optionally show error message to user
        }
      });

    }
  }

}
