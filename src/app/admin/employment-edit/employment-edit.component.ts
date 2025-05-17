import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
import { ServiceService } from '../../service.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldControl } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employment-edit',
  templateUrl: './employment-edit.component.html',
  styleUrls: ['./employment-edit.component.scss'],
  standalone: true,
  imports: [MatProgressSpinnerModule, MatInputModule, CommonModule, ReactiveFormsModule]
})
export class EmploymentEditComponent {
  employeeId!: string;
  loading = true;
  error: string | null = null;
  userForm!: FormGroup;
  constructor(private route: ActivatedRoute,
    private fb: FormBuilder,
    private service: ServiceService,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      contactNumber: ['', Validators.required],
      email: ['', Validators.required],
      role: ['', Validators.required],
      department: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const id = params.get("id");
      console.log(id);

      if (id) {
        this.employeeId = id;

        this.fetchEmployeeItem(this.employeeId)
      } else {
        this.error = 'No employee ID found in URL';
        this.loading = false;
      }
    });
  }


  fetchEmployeeItem(id: string): void {
    this.service.get(`https://backend-sm8m.onrender.com/employee/${id}`).subscribe({
      next: (data) => {
        this.userForm.patchValue(data);
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load Employee:', err);
        this.error = 'Failed to load employee details.';
        this.loading = false;
      }
    });
  }
  onSubmit() {
    if (this.userForm.invalid) return;

    const updatedData = this.userForm.value;
    console.log(updatedData);

    this.service.put(`https://backend-sm8m.onrender.com/employee/${this.employeeId}`, updatedData)
      .subscribe({
        next: (response) => {
          console.log(response);

          alert('Employee Details updated successfully.');
          this.router.navigate(['/admin/employment/view']);
        },
        error: (err) => {
          console.error('Failed to update employee:', err);
          alert('Update failed. Try again.');
        }
      });
  }

}