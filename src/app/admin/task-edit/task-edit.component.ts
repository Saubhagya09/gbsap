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
        // this.fetchTaskById(this.projectId);
      } else {
        console.error('No product ID found in the URL!');
      }

    })
    const task = this.service.getSelectedTask();
    if (task) {
      this.taskForm.patchValue({
        taskName: task.taskName,
        status: task.status,
        startDate: task.startDate.split('T')[0],
        dueDate: task.dueDate.split('T')[0],
        taskType: task.taskType,
        assignedTo: task.assignedTo,
      });
    } else {
      this.error = 'No task data found. Please go back and select a task again.';
    }
  }


  // fetchTaskById(id: string) {
  //   const url = `https://backend-sm8m.onrender.com/tasks/${id}`;
  //   this.service.get(url).subscribe({
  //     next: (data: any) => {
  //       this.taskForm.patchValue({
  //         taskName: data.taskName,
  //         status: data.status,
  //         startDate: data.startDate.split('T')[0],
  //         dueDate: data.dueDate.split('T')[0],
  //         taskType: data.taskType,
  //         assignedTo: data.assignedTo,
  //       });
  //       this.loading = false;
  //     },
  //     error: (err) => {
  //       this.error = 'Failed to fetch task.';
  //       console.error(err);
  //       this.loading = false;
  //     }
  //   });
  // }

  onSubmit() {
    if (!this.projectId || this.taskForm.invalid) return;

    const updateUrl = `https://backend-sm8m.onrender.com/tasks/${this.projectId}`;
    this.service.put(updateUrl, this.taskForm.value).subscribe({
      next: (res) => {
        alert('Task updated successfully!');
        this.router.navigate(['/admin/task/view'], {
          queryParams: { id: res.projectId }
        });
      },
      error: (err) => {
        this.error = 'Failed to update task.';
        console.error(err);
      }
    });
  }

}
