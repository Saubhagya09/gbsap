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
  taskId: string | null = null;
  projectId: string | null = null;
  taskForm!: FormGroup;
  loading = true;
  error: string | null = null;
  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private service: ServiceService) { }
  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.taskId = params.get("taskId")
      console.log("progressId", this.taskId)
      if (this.taskId) {
        this.fetchTaskById(this.taskId);
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




  }


  fetchTaskById(id: String): void {
    console.log(id);

    const url = `https://backend-sm8m.onrender.com/tasks/${id}`;
    this.service.get(url).subscribe({
      next: (data: any) => {
        console.log(data);
        this.projectId = data.projectId
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
    if (!this.taskId || this.taskForm.invalid) return;

    const updateUrl = `https://backend-sm8m.onrender.com/tasks/${this.taskId}`;
    this.service.put(updateUrl, this.taskForm.value).subscribe({
      next: (res) => {
        console.log(res.projectId);

        alert('Task updated successfully!');
        this.router.navigate(['/admin/task/view'], {
          queryParams: { id: this.projectId }
        });
      },
      error: (err) => {
        this.error = 'Failed to update task.';
        console.error(err);
      }
    });
  }

}
