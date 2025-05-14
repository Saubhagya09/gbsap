import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-progress-add',
  imports: [FormsModule, MatInputModule, MatFormFieldModule, MatButtonModule,
    MatDatepickerModule, MatNativeDateModule,
    MatOptionModule, MatCardModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './progress-add.component.html',
  styleUrl: './progress-add.component.scss'
})
export class ProgressAddComponent {
  taskForm: FormGroup;
  projectId: string | null = null;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private http: HttpClient) {
    this.taskForm = this.fb.group({
      type: ['', Validators.required],
      percentage: ['', Validators.required],
      payment: ['', Validators.required],
      vendor: ['', Validators.required],
      start: ['', Validators.required],
      expectedDate: ['', Validators.required],
      remark: ['', Validators.required],
    });

  }
  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.projectId = params.get("id")
      console.log(this.projectId)


    })
  }

  // formatDateToLocalString(date: Date): string {
  //   const year = date.getFullYear();
  //   const month = (date.getMonth() + 1).toString().padStart(2, '0');
  //   const day = date.getDate().toString().padStart(2, '0');
  //   return ${year}-${month}-${day};
  // } 

  formatDateToLocalString(date: any): string {
    const parsedDate = new Date(date);

    if (isNaN(parsedDate.getTime())) {
      throw new Error('Invalid date passed to formatDateToLocalString');
    }

    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
    const day = String(parsedDate.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }



  addNewProgress() {
    console.log('Submitted Plan:', FormData);
    // handle logic (e.g., send to service or API)


    if (this.taskForm.valid) {
      const formData = this.taskForm.value;
      console.log(formData);

      // Format the payload to match backend expectations
      const taskPayload = {
        projectId: this.projectId,
        type: formData.type?.trim() || '',
        starts: this.formatDateToLocalString(formData.start),
        percentage: formData.percentage?.toString().trim() || '',
        payment: formData.payment?.toString().trim() || '',
        expectedDate: this.formatDateToLocalString(formData.expectedDate),
        vendor: formData.vendor?.trim() || '',
        remarks: formData.remark?.trim() || '',
      };

      this.http.post('https://backend-sm8m.onrender.com/progress', taskPayload).subscribe({
        next: (response: any) => {
          console.log('Task created successfully:', response);
          // Optionally redirect or reset form
          this.taskForm.reset();

          this.router.navigate(['/admin/progress/view'], { queryParams: { id: this.projectId } }); // Adjust the route as needed
        },
        error: (error: any) => {
          console.error('Error creating task:', error);
          // Optionally show error message to user
        }
      });
    } else {
      console.warn('Form is invalid or projectId is missing');
    }
  }
}