import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-task-add',
  imports: [CommonModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatButtonModule, ReactiveFormsModule, MatSelectModule, MatOptionModule],
  templateUrl: './task-add.component.html',
  styleUrl: './task-add.component.scss'
})
export class TaskAddComponent {
  projectId: string | null = null;
  taskForm: FormGroup;
  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      taskname: ['', Validators.required],
      status: ['', Validators.required],
      tasktype: ['', Validators.required],
      assignto: ['', Validators.required],
      startdate: ['', Validators.required],
      dueDate: ['', Validators.required],
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
  //   return `${year}-${month}-${day}`;
  // }
  formatDateToLocalString(date: any): string {
    const parsedDate = new Date(date);

    if (isNaN(parsedDate.getTime())) {
      throw new Error('Invalid date passed to formatDateToLocalString');
    }

    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
    const day = String(parsedDate.getDate()).padStart(2, '0');

    return `${year} -${month} -${day}`;
  }


  addNewPlan() {
    if (this.taskForm.valid) {
      const formData = this.taskForm.value;

      // Format the payload to match backend expectations
      const taskPayload = {
        projectId: this.projectId,
        taskName: formData.taskname.trim(),
        status: formData.status.trim(),
        // startDate: formData.startdate,
        // dueDate: formData.dueDate,
        startDate: this.formatDateToLocalString(formData.startdate),
        dueDate: this.formatDateToLocalString(formData.dueDate),
        taskType: formData.tasktype.trim(),
        assignedTo: formData.assignto.trim(),
      };

      this.http.post('https://backend-sm8m.onrender.com/tasks', taskPayload).subscribe({
        next: (response) => {
          console.log('Task created successfully:', response);
          // Optionally redirect or reset form
          this.taskForm.reset();
          this.router.navigate(['/admin/task/view'], { queryParams: { id: this.projectId } }); // Adjust the route as needed
        },
        error: (error) => {
          console.error('Error creating task:', error);
          // Optionally show error message to user
        }
      });
    } else {
      console.warn('Form is invalid or projectId is missing');
    }
  }



}
