import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../service.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-task-edit',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.scss'
})
export class TaskEditComponent {
  projectId: string | null = null;
  taskForm!: FormGroup;
  loading = true;
  error: string | null = null;
  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private service: ServiceService) { }
  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.projectId = params.get("projectId")
      console.log(this.projectId)
      if (this.projectId) {
        this.fetchTaskById(this.projectId);
      } else {
        this.error = "No task ID provided.";
      }

    })

    this.taskForm = this.fb.group({
      taskName: ['', Validators.required],
      status: ['', Validators.required],
      startDate: ['', Validators.required],
      dueDate: ['', Validators.required],
      taskType: ['', Validators.required],
      assignedTo: ['', Validators.required],
    });

    console.log(this.taskForm);



  }


  fetchTaskById(id: String): void {
    console.log(id);

    const url = `https://backend-sm8m.onrender.com/tasks/${id}`;
    this.service.get(url).subscribe({
      next: (data: any) => {
        console.log(data);

        this.taskForm.patchValue({
          taskName: data.taskName,
          status: data.status,
          startDate: data.startDate.split('T')[0],
          dueDate: data.dueDate.split('T')[0],
          taskType: data.taskType,
          assignedTo: data.assignedTo,
        });
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to fetch task.';
        console.error(err);
        this.loading = false;
      }
    });
  }

  onSubmit() {
    if (!this.projectId || this.taskForm.invalid) {
      console.warn('Form invalid or missing ID');
      return;
    }

    console.log(this.taskForm.value);  // Check form values before sending

    // URL to update progress entry
    const updateUrl = `https://backend-sm8m.onrender.com/progress/${this.projectId}`;

    // Send PUT request to update the progress entry
    this.service.put(updateUrl, this.taskForm.value).subscribe({
      next: (res) => {
        // Handle successful update response
        console.log('Updated Progress:', res);
        alert('Task updated successfully!');

        // Redirect to the progress view page after success
        this.router.navigate(['/admin/progress/view'], {
          queryParams: { id: res.projectId }  // assuming `projectId` is returned in the response
        });
      },
      error: (err) => {
        // Handle error (for example, "Progress entry not found")
        if (err.error?.error === 'Progress entry not found') {
          this.error = 'The progress entry was not found.';
        } else {
          this.error = 'Failed to update task. Please try again later.';
        }
        console.error('Error during update:', err);
      }
    });
  }


}
