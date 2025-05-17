import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../service.service';
import { CommonModule } from '@angular/common';
declare var bootstrap: any;
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-task-view',
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './task-view.component.html',
  styleUrl: './task-view.component.scss'
})
export class TaskViewComponent {
  projectId: string | null = null;
  tasks: any[] = [];
  loading = true;
  error: string | null = null;
  signInModal: any;

  constructor(private route: ActivatedRoute, private service: ServiceService, private router: Router) { }
  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.projectId = params.get("id")
      console.log(this.projectId)
      if (this.projectId) {
        this.fetchTasksByProject(this.projectId);
      } else {
        console.error('No product ID found in the URL!');
      }

    })
  }


  fetchTasksByProject(id: string): void {
    this.loading = true; // Start loading
    const url = `https://backend-sm8m.onrender.com/tasks/project/${id}`;
    this.service.get(url).subscribe({
      next: (response: any) => {

        console.log(response);

        this.tasks = response;
        this.loading = false; //loading finished
        console.log(this.tasks)
      },


      error: (err) => {
        this.error = 'Failed to load tasks. Please try again later.';
        console.error('API error:', err);
        this.loading = false;
        if (err.status === 404 && err.error?.error === 'No tasks found for this project') {
          const confirmAdd = confirm('No tasks found. Do you want to add a task?');
          if (confirmAdd) {
            this.router.navigate(['/admin/task/add'], { queryParams: { projectId: id } });
          } else {
            this.error = 'Failed to load tasks. Please try again later.';
          }
        }
      }
    });
  }

  edit(task: any) {
    console.log("task_edit", task);

    console.log("dhdg", task.projectId._id);
    // console.log(task._id);


    this.router.navigate(["/admin/task/edit"], { queryParams: { taskId: task._id } })

  }
  delete(task: any) {
    console.log(task);
    const confirmed = confirm(`Are you sure you want to delete the task "${task.taskName}"?`);
    if (!confirmed) return;

    const url = `https://backend-sm8m.onrender.com/tasks/${task._id}`;
    this.service.delete(url).subscribe({
      next: (response: any) => {
        console.log(response.message || 'Task deleted successfully');
        // Update UI by removing deleted task from array
        this.tasks = this.tasks.filter(t => t._id !== task._id);
        alert('Task deleted successfully!');
      },
      error: (err) => {
        console.error('Delete failed:', err);
        alert(`Failed to delete task. ${err.error?.error || 'Please try again later.'}`);
      }
    });

  }


  closeModal() {
    // Remove modal backdrop
    const modalBackdrops = document.querySelectorAll('.modal-backdrop');
    modalBackdrops.forEach(backdrop => backdrop.remove());

    // Remove modal-open class to restore page behavior
    document.body.classList.remove('modal-open');

    // Restore scrolling and fix right-side spacing issue
    document.body.style.overflow = "";
    document.body.style.paddingRight = "0px";

    // Hide modal completely
    const modal = document.querySelector('.modal.show') as HTMLElement | null;
    if (modal) {
      modal.classList.remove('show');
      modal.setAttribute('aria-hidden', 'true');
      (modal as HTMLElement).style.display = 'none';
    }
  }




}
