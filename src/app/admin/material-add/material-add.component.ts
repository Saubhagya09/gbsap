import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-material-add',
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,

  ],
  templateUrl: './material-add.component.html',
  styleUrl: './material-add.component.scss'
})
export class MaterialAddComponent {
  materialForm: FormGroup;
  materialId: string | null = null;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private http: HttpClient) {
    this.materialForm = this.fb.group({
      date: ['', Validators.required],
      materialName: ['', Validators.required],
      availableQuantity: ['', Validators.required],
      requiredQuantity: ['', Validators.required],
      issuedQuantity: ['', Validators.required],
      price: ['', Validators.required],
      suppliedVendor: ['', Validators.required],
      unitofMeasurement: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.materialId = params.get("id")
      console.log(this.materialId)


    })
  }

  addMaterialEntry(): void {
    if (this.materialForm.valid) {
      console.log('Form Data:', this.materialForm.value);

      const formData = this.materialForm.value
      const taskPayload = {
        projectId: this.materialId,
        date: formData.date,
        materialName: formData.materialName,
        availableQuantity: formData.availableQuantity,
        requiredQuantity: formData.requiredQuantity,
        issuedQuantity: formData.issuedQuantity,
        price: formData.price,
        suppliedVendor: formData.suppliedVendor,
        unitofMeasurement: formData.unitofMeasurement,

      };
      console.log(taskPayload);

      this.http.post('https://backend-sm8m.onrender.com/materials', taskPayload).subscribe({
        next: (response: any) => {
          console.log('Task created successfully:', response);
          // Optionally redirect or reset form
          // this.materialForm.reset();
          this.router.navigate(['/admin/material/view'], { queryParams: { id: this.materialId } }); // Adjust the route as needed
        },
        error: (error: any) => {
          console.error('Error creating task:', error);
          // Optionally show error message to user
        }
      });

    }
  }
}
